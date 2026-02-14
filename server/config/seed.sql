-- ============================================
-- INVICTUS PCB Inventory – Seed Data
-- ============================================

-- Insert sample components (electronic parts)
INSERT INTO components (name, part_number, current_stock, monthly_required_qty, unit) VALUES
  ('Capacitor 10µF',        'CP-10UF-001',   4500,  5000, 'pcs'),
  ('Capacitor 100nF',       'CP-100NF-002',  3200,  4000, 'pcs'),
  ('Resistor 10kΩ',         'RS-10K-001',     120,   500, 'pcs'),
  ('Resistor 4.7kΩ',        'RS-4K7-002',    2800,  3000, 'pcs'),
  ('Microcontroller 328P',  'MC-328P-X',       89,   100, 'pcs'),
  ('ESP32 Module',          'MC-ESP32-01',    350,   400, 'pcs'),
  ('Voltage Regulator 3.3V','VR-3V3-LDO',    1200,  1500, 'pcs'),
  ('Voltage Regulator 5V',  'VR-5V-7805',     800,  1000, 'pcs'),
  ('LED Green 3mm',         'LED-GRN-3MM',   6000,  7000, 'pcs'),
  ('LED Red 3mm',           'LED-RED-3MM',   5500,  6000, 'pcs'),
  ('Crystal 16MHz',         'XTAL-16MHZ',     400,   500, 'pcs'),
  ('USB Type-C Connector',  'CON-USBC-01',    250,   300, 'pcs'),
  ('Header Pin 40-pin',     'HDR-40P-MALE',  1800,  2000, 'pcs'),
  ('MOSFET N-Channel',      'FET-NCH-001',    600,   800, 'pcs'),
  ('Op-Amp LM358',          'IC-LM358-01',    950,  1200, 'pcs')
ON CONFLICT (part_number) DO NOTHING;

-- Insert sample PCBs
INSERT INTO pcbs (name, sku, description) VALUES
  ('Mainboard Alpha v2',    'MB-ALP-02',    'Primary control board with MCU and power regulation'),
  ('Power Unit Delta',      'PSU-DEL-01',   'Regulated power supply module for industrial use'),
  ('Sensor Array X',        'SEN-ARR-X',    'Multi-sensor board with ADC and signal conditioning'),
  ('Comms Module Z',        'COM-MOD-Z',    'WiFi/BLE communication module based on ESP32'),
  ('Battery Management',    'BMS-LION-4S',  '4S LiPo battery management system with balancing')
ON CONFLICT (sku) DO NOTHING;

-- Map components to PCBs (Bill of Materials)
-- Mainboard Alpha v2 (12 component types)
INSERT INTO pcb_components (pcb_id, component_id, qty_per_unit) VALUES
  (1, 1, 8),   -- 8x Capacitor 10µF
  (1, 2, 12),  -- 12x Capacitor 100nF
  (1, 3, 20),  -- 20x Resistor 10kΩ
  (1, 4, 15),  -- 15x Resistor 4.7kΩ
  (1, 5, 1),   -- 1x Microcontroller 328P
  (1, 7, 2),   -- 2x Voltage Reg 3.3V
  (1, 8, 1),   -- 1x Voltage Reg 5V
  (1, 9, 4),   -- 4x LED Green
  (1, 10, 2),  -- 2x LED Red
  (1, 11, 1),  -- 1x Crystal 16MHz
  (1, 12, 1),  -- 1x USB-C
  (1, 13, 3)   -- 3x Header Pins
ON CONFLICT (pcb_id, component_id) DO NOTHING;

-- Power Unit Delta (8 component types)
INSERT INTO pcb_components (pcb_id, component_id, qty_per_unit) VALUES
  (2, 1, 15),  -- 15x Capacitor 10µF
  (2, 2, 8),   -- 8x Capacitor 100nF
  (2, 3, 10),  -- 10x Resistor 10kΩ
  (2, 7, 3),   -- 3x Voltage Reg 3.3V
  (2, 8, 2),   -- 2x Voltage Reg 5V
  (2, 9, 2),   -- 2x LED Green
  (2, 10, 3),  -- 3x LED Red
  (2, 14, 4)   -- 4x MOSFET
ON CONFLICT (pcb_id, component_id) DO NOTHING;

-- Sensor Array X (10 component types)
INSERT INTO pcb_components (pcb_id, component_id, qty_per_unit) VALUES
  (3, 1, 6),   -- 6x Capacitor 10µF
  (3, 2, 20),  -- 20x Capacitor 100nF
  (3, 3, 25),  -- 25x Resistor 10kΩ
  (3, 4, 20),  -- 20x Resistor 4.7kΩ
  (3, 5, 1),   -- 1x Microcontroller
  (3, 7, 1),   -- 1x Voltage Reg 3.3V
  (3, 11, 1),  -- 1x Crystal
  (3, 13, 5),  -- 5x Header Pins
  (3, 15, 4),  -- 4x Op-Amp
  (3, 14, 2)   -- 2x MOSFET
ON CONFLICT (pcb_id, component_id) DO NOTHING;

-- Comms Module Z (8 component types)
INSERT INTO pcb_components (pcb_id, component_id, qty_per_unit) VALUES
  (4, 1, 4),   -- 4x Capacitor 10µF
  (4, 2, 10),  -- 10x Capacitor 100nF
  (4, 3, 8),   -- 8x Resistor 10kΩ
  (4, 6, 1),   -- 1x ESP32
  (4, 7, 1),   -- 1x Voltage Reg 3.3V
  (4, 9, 2),   -- 2x LED Green
  (4, 12, 1),  -- 1x USB-C
  (4, 13, 2)   -- 2x Header Pins
ON CONFLICT (pcb_id, component_id) DO NOTHING;

-- Battery Management (10 component types)
INSERT INTO pcb_components (pcb_id, component_id, qty_per_unit) VALUES
  (5, 1, 20),  -- 20x Capacitor 10µF
  (5, 2, 15),  -- 15x Capacitor 100nF
  (5, 3, 12),  -- 12x Resistor 10kΩ
  (5, 4, 10),  -- 10x Resistor 4.7kΩ
  (5, 6, 1),   -- 1x ESP32
  (5, 8, 2),   -- 2x Voltage Reg 5V
  (5, 9, 3),   -- 3x LED Green
  (5, 10, 4),  -- 4x LED Red
  (5, 14, 8),  -- 8x MOSFET
  (5, 15, 2)   -- 2x Op-Amp
ON CONFLICT (pcb_id, component_id) DO NOTHING;
