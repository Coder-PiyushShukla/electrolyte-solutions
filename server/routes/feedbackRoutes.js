const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authMiddleware } = require('../middleware/authMiddleware');

// ─── POST /api/feedback ── Submit user feedback ─────────────────
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { rating, category, message } = req.body;

        if (!rating || !message) {
            return res.status(400).json({ error: 'Rating and message are required.' });
        }

        const result = await pool.query(
            `INSERT INTO feedback (user_id, rating, category, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, rating, category, message, created_at`,
            [req.user.id, rating, category || 'other', message]
        );

        res.status(201).json({
            message: 'Feedback submitted successfully.',
            feedback: result.rows[0],
        });
    } catch (err) {
        console.error('Feedback error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// ─── GET /api/feedback ── List all feedback (Admin) ─────────────
router.get('/', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT f.id, f.rating, f.category, f.message, f.created_at,
             u.name AS user_name, u.email AS user_email
      FROM feedback f
      JOIN users u ON f.user_id = u.id
      ORDER BY f.created_at DESC
    `);

        res.json(result.rows);
    } catch (err) {
        console.error('Get feedback error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
