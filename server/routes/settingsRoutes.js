const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');
const multer = require('multer');
const XLSX = require('xlsx');

// Multer config: store in memory for xlsx parsing
const upload = multer({ storage: multer.memoryStorage() });

// ─── GET /api/settings ── Get global settings ───────────────────
router.get('/', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query('SELECT key, value FROM settings');
        const settings = {};
        result.rows.forEach((row) => { settings[row.key] = row.value; });
        res.json(settings);
    } catch (err) {
        console.error('Get settings error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// ─── PUT /api/settings ── Update settings (Admin only) ──────────
router.put('/', authMiddleware, adminOnly, async (req, res) => {
    try {
        const { low_stock_threshold } = req.body;

        if (low_stock_threshold !== undefined) {
            const val = parseFloat(low_stock_threshold);
            if (isNaN(val) || val < 1 || val > 100) {
                return res.status(400).json({ error: 'Threshold must be between 1 and 100.' });
            }
            await pool.query(
                `INSERT INTO settings (key, value) VALUES ('low_stock_threshold', $1)
         ON CONFLICT (key) DO UPDATE SET value = $1`,
                [String(val)]
            );
        }

        res.json({ message: 'Settings updated.' });
    } catch (err) {
        console.error('Update settings error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// ─── GET /api/settings/export ── Export inventory as XLSX ────────
router.get('/export', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT name, part_number, current_stock, monthly_required_qty, unit
      FROM components ORDER BY name
    `);

        // Build workbook
        const ws = XLSX.utils.json_to_sheet(result.rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Inventory');

        // Generate buffer
        const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Disposition', 'attachment; filename=Invictus_Inventory.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    } catch (err) {
        console.error('Export error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// ─── POST /api/settings/import ── Import XLSX (Admin only) ──────
router.post('/import', authMiddleware, adminOnly, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        let updated = 0;
        let created = 0;
        let errors = [];

        for (const row of data) {
            const { name, part_number, current_stock, monthly_required_qty, unit } = row;

            if (!part_number) {
                errors.push(`Skipped row: missing part_number`);
                continue;
            }

            // Upsert: update if exists, create if not
            const existing = await pool.query(
                'SELECT id FROM components WHERE part_number = $1', [part_number]
            );

            if (existing.rows.length > 0) {
                await pool.query(
                    `UPDATE components
           SET name = COALESCE($1, name),
               current_stock = COALESCE($2, current_stock),
               monthly_required_qty = COALESCE($3, monthly_required_qty),
               unit = COALESCE($4, unit)
           WHERE part_number = $5`,
                    [name, current_stock, monthly_required_qty, unit, part_number]
                );
                updated++;
            } else {
                await pool.query(
                    `INSERT INTO components (name, part_number, current_stock, monthly_required_qty, unit)
           VALUES ($1, $2, $3, $4, $5)`,
                    [name || 'Unknown', part_number, current_stock || 0, monthly_required_qty || 0, unit || 'pcs']
                );
                created++;
            }
        }

        res.json({
            message: 'Import completed.',
            created,
            updated,
            errors: errors.length > 0 ? errors : undefined,
        });
    } catch (err) {
        console.error('Import error:', err);
        res.status(500).json({ error: 'Import failed. Check file format.' });
    }
});

module.exports = router;
