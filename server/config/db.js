const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }, // Required for Supabase
  max: 20,                           // Max pool size
  idleTimeoutMillis: 60000,
  connectionTimeoutMillis: 30000,
});

// Test connection on startup
pool.query('SELECT NOW()')
  .then(() => console.log('✅ PostgreSQL connected via pool'))
  .catch((err) => console.error('❌ PostgreSQL connection error:', err.message));

module.exports = pool;
