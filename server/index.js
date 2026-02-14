const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import route modules
const authRoutes = require('./routes/authRoutes');
const componentRoutes = require('./routes/componentRoutes');
const pcbRoutes = require('./routes/pcbRoutes');
const productionRoutes = require('./routes/productionRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const alertRoutes = require('./routes/alertRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const historyRoutes = require('./routes/historyRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ─────────────────────────────────────────────────
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/components', componentRoutes);
app.use('/api/pcbs', pcbRoutes);
app.use('/api/production', productionRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/feedback', feedbackRoutes);

// ─── Health Check ──────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({ status: 'online', timestamp: new Date().toISOString() });
});

// ─── Global Error Handler ──────────────────────────────────────
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ error: 'Something went wrong.' });
});

// ─── Start Server ──────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n⚡ INVICTUS Server running on port ${PORT}`);
    console.log(`📡 Health: http://localhost:${PORT}/api/health\n`);
});
