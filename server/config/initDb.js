/**
 * Database initializer: runs schema.sql and seed.sql against the configured PostgreSQL.
 * Usage: node config/initDb.js
 */
const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function initDb() {
    try {
        console.log('🔧 Running schema migration...');
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
        await pool.query(schema);
        console.log('✅ Schema created successfully.');

        console.log('🌱 Running seed data...');
        const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
        await pool.query(seed);
        console.log('✅ Seed data inserted successfully.');

        console.log('\n🚀 Database initialization complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Database initialization failed:', err.message);
        process.exit(1);
    }
}

initDb();
