-- ============================================
-- INVICTUS PCB Inventory – Database Schema
-- Target: Supabase PostgreSQL
-- ============================================

-- 1. Users (with role-based access)
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          VARCHAR(20) DEFAULT 'viewer' CHECK (role IN ('admin', 'viewer')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Electronic Components
CREATE TABLE IF NOT EXISTS components (
  id                   SERIAL PRIMARY KEY,
  name                 VARCHAR(150) NOT NULL,
  part_number          VARCHAR(50) UNIQUE NOT NULL,
  current_stock        INTEGER NOT NULL DEFAULT 0 CHECK (current_stock >= 0),
  monthly_required_qty INTEGER NOT NULL DEFAULT 0,
  unit                 VARCHAR(20) DEFAULT 'pcs',
  created_at           TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PCB Models
CREATE TABLE IF NOT EXISTS pcbs (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(150) NOT NULL,
  sku         VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PCB ↔ Component mapping (Bill of Materials)
CREATE TABLE IF NOT EXISTS pcb_components (
  id            SERIAL PRIMARY KEY,
  pcb_id        INTEGER NOT NULL REFERENCES pcbs(id) ON DELETE CASCADE,
  component_id  INTEGER NOT NULL REFERENCES components(id) ON DELETE CASCADE,
  qty_per_unit  INTEGER NOT NULL DEFAULT 1 CHECK (qty_per_unit > 0),
  UNIQUE(pcb_id, component_id)
);

-- 5. Production Log (one row per batch)
CREATE TABLE IF NOT EXISTS production_log (
  id          SERIAL PRIMARY KEY,
  pcb_id      INTEGER NOT NULL REFERENCES pcbs(id),
  quantity    INTEGER NOT NULL CHECK (quantity > 0),
  produced_by INTEGER REFERENCES users(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Consumption History (per-component deduction audit trail)
CREATE TABLE IF NOT EXISTS consumption_history (
  id                SERIAL PRIMARY KEY,
  component_id      INTEGER NOT NULL REFERENCES components(id),
  production_log_id INTEGER NOT NULL REFERENCES production_log(id) ON DELETE CASCADE,
  qty_consumed      INTEGER NOT NULL,
  stock_before      INTEGER NOT NULL,
  stock_after       INTEGER NOT NULL,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Procurement Alerts
CREATE TABLE IF NOT EXISTS alerts (
  id                   SERIAL PRIMARY KEY,
  component_id         INTEGER NOT NULL REFERENCES components(id),
  alert_type           VARCHAR(50) DEFAULT 'low_stock',
  threshold_pct        NUMERIC(5,2) NOT NULL,
  current_stock        INTEGER NOT NULL,
  monthly_required_qty INTEGER NOT NULL,
  resolved             BOOLEAN DEFAULT FALSE,
  created_at           TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Global Settings (key-value store)
CREATE TABLE IF NOT EXISTS settings (
  key   VARCHAR(100) PRIMARY KEY,
  value TEXT NOT NULL
);

-- Default settings
INSERT INTO settings (key, value)
VALUES ('low_stock_threshold', '20')
ON CONFLICT (key) DO NOTHING;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_components_part ON components(part_number);
CREATE INDEX IF NOT EXISTS idx_alerts_active ON alerts(resolved) WHERE resolved = FALSE;
CREATE INDEX IF NOT EXISTS idx_consumption_created ON consumption_history(created_at);
CREATE INDEX IF NOT EXISTS idx_production_created ON production_log(created_at);
