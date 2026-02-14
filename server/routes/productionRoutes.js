const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');

// ─── POST /api/production/simulate ── Dry-run check ─────────────
router.post('/simulate', authMiddleware, async (req, res) => {
    try {
        const { pcb_id, quantity } = req.body;

        if (!pcb_id || !quantity || quantity <= 0) {
            return res.status(400).json({ error: 'pcb_id and positive quantity are required.' });
        }

        // Get BOM for this PCB
        const bom = await pool.query(`
      SELECT c.id, c.name, c.part_number, c.current_stock, c.unit,
             pc.qty_per_unit,
             (pc.qty_per_unit * $2) AS total_needed,
             c.current_stock - (pc.qty_per_unit * $2) AS remaining
      FROM pcb_components pc
      JOIN components c ON pc.component_id = c.id
      WHERE pc.pcb_id = $1
      ORDER BY c.name
    `, [pcb_id, quantity]);

        if (bom.rows.length === 0) {
            return res.status(404).json({ error: 'PCB not found or has no components.' });
        }

        const shortages = bom.rows
            .filter(r => r.remaining < 0)
            .map(r => ({
                name: r.name,
                part_number: r.part_number,
                current_stock: r.current_stock,
                needed: r.total_needed,
                deficit: Math.abs(r.remaining),
            }));

        const totalComponents = bom.rows.reduce((sum, r) => sum + parseInt(r.total_needed), 0);
        const projectedWaste = Math.floor(quantity * 0.02); // 2% scrap rate

        res.json({
            status: shortages.length > 0 ? 'critical' : 'optimal',
            requiredComponents: totalComponents,
            projectedWaste,
            shortages,
            breakdown: bom.rows,
        });
    } catch (err) {
        console.error('Production simulate error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// ─── POST /api/production/execute ── Transaction-safe production ─
router.post('/execute', authMiddleware, adminOnly, async (req, res) => {
    const client = await pool.connect();
    try {
        const { pcb_id, quantity } = req.body;

        if (!pcb_id || !quantity || quantity <= 0) {
            return res.status(400).json({ error: 'pcb_id and positive quantity are required.' });
        }

        await client.query('BEGIN');

        // 1. Get BOM
        const bom = await client.query(`
      SELECT pc.component_id, pc.qty_per_unit, c.current_stock, c.name, c.monthly_required_qty
      FROM pcb_components pc
      JOIN components c ON pc.component_id = c.id
      WHERE pc.pcb_id = $1
      FOR UPDATE OF c
    `, [pcb_id]);

        if (bom.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'PCB not found or has no components.' });
        }

        // 2. Pre-flight: check all components have enough stock
        const shortages = [];
        for (const row of bom.rows) {
            const needed = row.qty_per_unit * quantity;
            if (row.current_stock < needed) {
                shortages.push({
                    name: row.name,
                    current_stock: row.current_stock,
                    needed,
                    deficit: needed - row.current_stock,
                });
            }
        }

        if (shortages.length > 0) {
            await client.query('ROLLBACK');
            return res.status(409).json({
                error: 'Insufficient stock. Transaction rolled back.',
                shortages,
            });
        }

        // 3. Create production log entry
        const prodRes = await client.query(
            `INSERT INTO production_log (pcb_id, quantity, produced_by)
       VALUES ($1, $2, $3) RETURNING id`,
            [pcb_id, quantity, req.user.id]
        );
        const productionLogId = prodRes.rows[0].id;

        // 4. Get the threshold setting
        const thresholdRes = await client.query(
            "SELECT value FROM settings WHERE key = 'low_stock_threshold'"
        );
        const thresholdPct = parseFloat(thresholdRes.rows[0]?.value || 20) / 100;

        // 5. Deduct stock + log consumption + check alerts
        for (const row of bom.rows) {
            const consumed = row.qty_per_unit * quantity;
            const stockBefore = row.current_stock;
            const stockAfter = stockBefore - consumed;

            // Deduct stock (constraint ensures >= 0)
            await client.query(
                `UPDATE components SET current_stock = $1 WHERE id = $2`,
                [stockAfter, row.component_id]
            );

            // Log consumption history
            await client.query(
                `INSERT INTO consumption_history
         (component_id, production_log_id, qty_consumed, stock_before, stock_after)
         VALUES ($1, $2, $3, $4, $5)`,
                [row.component_id, productionLogId, consumed, stockBefore, stockAfter]
            );

            // 6. 20% Alert Logic: if stock drops below threshold of monthly required
            if (row.monthly_required_qty > 0) {
                const alertThreshold = row.monthly_required_qty * thresholdPct;
                if (stockAfter < alertThreshold && stockBefore >= alertThreshold) {
                    // Only create alert if crossing the threshold boundary
                    await client.query(
                        `INSERT INTO alerts
             (component_id, alert_type, threshold_pct, current_stock, monthly_required_qty)
             VALUES ($1, 'low_stock', $2, $3, $4)`,
                        [row.component_id, thresholdPct * 100, stockAfter, row.monthly_required_qty]
                    );
                }
            }
        }

        await client.query('COMMIT');

        res.status(201).json({
            message: 'Production batch recorded successfully.',
            production_log_id: productionLogId,
            pcb_id,
            quantity,
        });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Production execute error:', err);
        res.status(500).json({ error: 'Internal server error. Transaction rolled back.' });
    } finally {
        client.release();
    }
});

// ─── GET /api/production/history ── Production log ──────────────
router.get('/history', authMiddleware, async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        const result = await pool.query(`
      SELECT pl.id, pl.quantity, pl.created_at,
             p.name AS pcb_name, p.sku AS pcb_sku,
             u.name AS produced_by
      FROM production_log pl
      JOIN pcbs p ON pl.pcb_id = p.id
      LEFT JOIN users u ON pl.produced_by = u.id
      ORDER BY pl.created_at DESC
      LIMIT $1 OFFSET $2
    `, [limit, offset]);

        const countRes = await pool.query('SELECT COUNT(*)::int FROM production_log');

        res.json({
            data: result.rows,
            total: countRes.rows[0].count,
            page: parseInt(page),
            totalPages: Math.ceil(countRes.rows[0].count / limit),
        });
    } catch (err) {
        console.error('Production history error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
