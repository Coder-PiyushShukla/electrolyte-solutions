const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authMiddleware } = require('../middleware/authMiddleware');

// ─── GET /api/history ── Paginated consumption history ──────────
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { page = 1, limit = 30, component_id } = req.query;
        const offset = (page - 1) * limit;
        const params = [limit, offset];
        let whereClause = '';

        if (component_id) {
            whereClause = 'WHERE ch.component_id = $3';
            params.push(component_id);
        }

        const result = await pool.query(`
      SELECT ch.id, ch.qty_consumed, ch.stock_before, ch.stock_after, ch.created_at,
             c.name AS component_name, c.part_number,
             p.name AS pcb_name, p.sku AS pcb_sku,
             pl.quantity AS batch_size
      FROM consumption_history ch
      JOIN components c ON ch.component_id = c.id
      JOIN production_log pl ON ch.production_log_id = pl.id
      JOIN pcbs p ON pl.pcb_id = p.id
      ${whereClause}
      ORDER BY ch.created_at DESC
      LIMIT $1 OFFSET $2
    `, params);

        // Total count
        const countQuery = component_id
            ? 'SELECT COUNT(*)::int FROM consumption_history WHERE component_id = $1'
            : 'SELECT COUNT(*)::int FROM consumption_history';
        const countParams = component_id ? [component_id] : [];
        const countRes = await pool.query(countQuery, countParams);

        res.json({
            data: result.rows,
            total: countRes.rows[0].count,
            page: parseInt(page),
            totalPages: Math.ceil(countRes.rows[0].count / limit),
        });
    } catch (err) {
        console.error('History error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
