const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authMiddleware } = require('../middleware/authMiddleware');

// ─── GET /api/dashboard/stats ── Aggregate statistics ───────────
router.get('/stats', authMiddleware, async (req, res) => {
    try {
        // Total stock across all components
        const stockRes = await pool.query(
            'SELECT COALESCE(SUM(current_stock), 0)::int AS total_stock FROM components'
        );

        // Active alert count
        const alertRes = await pool.query(
            'SELECT COUNT(*)::int AS alert_count FROM alerts WHERE resolved = FALSE'
        );

        // Today's production
        const prodRes = await pool.query(`
      SELECT COALESCE(SUM(quantity), 0)::int AS units_today
      FROM production_log
      WHERE created_at::date = CURRENT_DATE
    `);

        // Total components count
        const compRes = await pool.query('SELECT COUNT(*)::int AS total_components FROM components');

        // Get threshold for efficiency calc
        const settingsRes = await pool.query(
            "SELECT value FROM settings WHERE key = 'low_stock_threshold'"
        );
        const threshold = parseFloat(settingsRes.rows[0]?.value || 20) / 100;

        // Calculate efficiency: % of components that are above critical level
        const healthyRes = await pool.query(`
      SELECT COUNT(*)::int AS healthy
      FROM components
      WHERE monthly_required_qty = 0
         OR (current_stock::float / monthly_required_qty) > $1
    `, [threshold]);

        const totalComp = compRes.rows[0].total_components;
        const efficiency = totalComp > 0
            ? Math.round((healthyRes.rows[0].healthy / totalComp) * 100 * 10) / 10
            : 100;

        res.json({
            totalStock: stockRes.rows[0].total_stock,
            alertCount: alertRes.rows[0].alert_count,
            unitsToday: prodRes.rows[0].units_today,
            efficiency,
        });
    } catch (err) {
        console.error('Dashboard stats error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// ─── GET /api/dashboard/chart ── Last 7 days consumption ────────
router.get('/chart', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT
        TO_CHAR(ch.created_at::date, 'Mon DD') AS name,
        COALESCE(SUM(ch.qty_consumed), 0)::int AS consumed
      FROM consumption_history ch
      WHERE ch.created_at >= NOW() - INTERVAL '7 days'
      GROUP BY ch.created_at::date
      ORDER BY ch.created_at::date ASC
    `);

        // If fewer than 7 days, pad with zeros
        const data = result.rows.length > 0
            ? result.rows
            : [{ name: 'No data', consumed: 0 }];

        res.json(data);
    } catch (err) {
        console.error('Dashboard chart error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
