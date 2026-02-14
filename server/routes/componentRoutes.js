const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');

// ─── GET /api/components ── List all components with status ─────
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { search } = req.query;

        // Get global threshold
        const settingsRes = await pool.query(
            "SELECT value FROM settings WHERE key = 'low_stock_threshold'"
        );
        const threshold = parseFloat(settingsRes.rows[0]?.value || 20) / 100;

        let query = `
      SELECT id, name, part_number, current_stock, monthly_required_qty, unit, created_at
      FROM components
    `;
        const params = [];

        if (search) {
            query += ` WHERE name ILIKE $1 OR part_number ILIKE $1`;
            params.push(`%${search}%`);
        }

        query += ` ORDER BY name ASC`;

        const result = await pool.query(query, params);

        // Attach status based on threshold
        const components = result.rows.map((c) => {
            const ratio = c.monthly_required_qty > 0
                ? c.current_stock / c.monthly_required_qty
                : 1;

            let status = 'good';
            if (ratio <= threshold) status = 'critical';
            else if (ratio <= threshold * 2) status = 'warning';

            return { ...c, status };
        });

        res.json(components);
    } catch (err) {
        console.error('Get components error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// ─── GET /api/components/:id ── Single component ────────────────
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM components WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Component not found.' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Get single component error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// ─── POST /api/components ── Add new component (Admin only) ─────
router.post('/', authMiddleware, adminOnly, async (req, res) => {
    try {
        const { name, part_number, current_stock, monthly_required_qty, unit } = req.body;

        if (!name || !part_number) {
            return res.status(400).json({ error: 'Name and part_number are required.' });
        }

        const result = await pool.query(
            `INSERT INTO components (name, part_number, current_stock, monthly_required_qty, unit)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
            [name, part_number, current_stock || 0, monthly_required_qty || 0, unit || 'pcs']
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Part number already exists.' });
        }
        console.error('Create component error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// ─── PUT /api/components/:id ── Update component (Admin only) ───
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, part_number, current_stock, monthly_required_qty, unit } = req.body;

        const result = await pool.query(
            `UPDATE components
       SET name = COALESCE($1, name),
           part_number = COALESCE($2, part_number),
           current_stock = COALESCE($3, current_stock),
           monthly_required_qty = COALESCE($4, monthly_required_qty),
           unit = COALESCE($5, unit)
       WHERE id = $6
       RETURNING *`,
            [name, part_number, current_stock, monthly_required_qty, unit, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Component not found.' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Part number already exists.' });
        }
        console.error('Update component error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// ─── DELETE /api/components/:id ── Delete component (Admin only) ─
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM components WHERE id = $1 RETURNING id, name',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Component not found.' });
        }

        res.json({ message: 'Component deleted.', deleted: result.rows[0] });
    } catch (err) {
        console.error('Delete component error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
