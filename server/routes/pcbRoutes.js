const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');

// ─── GET /api/pcbs ── List all PCBs with component count ────────
router.get('/', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT p.id, p.name, p.sku, p.description, p.created_at,
             COUNT(pc.component_id)::int AS components
      FROM pcbs p
      LEFT JOIN pcb_components pc ON p.id = pc.pcb_id
      GROUP BY p.id
      ORDER BY p.name ASC
    `);

        res.json(result.rows);
    } catch (err) {
        console.error('Get PCBs error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// ─── GET /api/pcbs/:id/components ── BOM for a specific PCB ─────
router.get('/:id/components', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(`
      SELECT c.id, c.name, c.part_number, c.current_stock, c.unit,
             pc.qty_per_unit
      FROM pcb_components pc
      JOIN components c ON pc.component_id = c.id
      WHERE pc.pcb_id = $1
      ORDER BY c.name ASC
    `, [id]);

        res.json(result.rows);
    } catch (err) {
        console.error('Get PCB components error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// ─── POST /api/pcbs ── Create PCB with component list (Admin) ───
router.post('/', authMiddleware, adminOnly, async (req, res) => {
    const client = await pool.connect();
    try {
        const { name, sku, description, components } = req.body;
        // components = [{ component_id, qty_per_unit }, ...]

        if (!name || !sku) {
            return res.status(400).json({ error: 'Name and SKU are required.' });
        }

        await client.query('BEGIN');

        const pcbRes = await client.query(
            `INSERT INTO pcbs (name, sku, description) VALUES ($1, $2, $3) RETURNING *`,
            [name, sku, description || null]
        );
        const pcb = pcbRes.rows[0];

        // Insert component mappings if provided
        if (components && Array.isArray(components)) {
            for (const comp of components) {
                await client.query(
                    `INSERT INTO pcb_components (pcb_id, component_id, qty_per_unit) VALUES ($1, $2, $3)`,
                    [pcb.id, comp.component_id, comp.qty_per_unit || 1]
                );
            }
        }

        await client.query('COMMIT');

        res.status(201).json(pcb);
    } catch (err) {
        await client.query('ROLLBACK');
        if (err.code === '23505') {
            return res.status(409).json({ error: 'PCB SKU already exists.' });
        }
        console.error('Create PCB error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    } finally {
        client.release();
    }
});

module.exports = router;
