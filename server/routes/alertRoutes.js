const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');

// ─── GET /api/alerts ── List active alerts ──────────────────────
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { show_resolved } = req.query;

        let query = `
      SELECT a.id, a.alert_type, a.threshold_pct, a.current_stock,
             a.monthly_required_qty, a.resolved, a.created_at,
             c.name AS component_name, c.part_number
      FROM alerts a
      JOIN components c ON a.component_id = c.id
    `;

        if (!show_resolved || show_resolved === 'false') {
            query += ` WHERE a.resolved = FALSE`;
        }

        query += ` ORDER BY a.created_at DESC`;

        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error('Get alerts error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// ─── PUT /api/alerts/:id/resolve ── Mark alert resolved (Admin) ─
router.put('/:id/resolve', authMiddleware, adminOnly, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `UPDATE alerts SET resolved = TRUE WHERE id = $1 RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Alert not found.' });
        }

        res.json({ message: 'Alert resolved.', alert: result.rows[0] });
    } catch (err) {
        console.error('Resolve alert error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
