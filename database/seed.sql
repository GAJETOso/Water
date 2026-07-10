-- AQUOR seed data — development fixtures
BEGIN;

-- Price lists
INSERT INTO price_lists (id, name, currency) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'retail',            'NGN'),
  ('a0000000-0000-0000-0000-000000000002', 'wholesale-tier-1',  'NGN'),
  ('a0000000-0000-0000-0000-000000000003', 'export',            'USD');

-- Products
INSERT INTO products (id, slug, name, category, description) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'sachet-50cl',   'AQUOR Sachet Water 50cl',      'sachet',    'Rigorously purified everyday hydration.'),
  ('b0000000-0000-0000-0000-000000000002', 'pet-500ml',     'AQUOR Still Water 500ml',      'pet',       'The classic bottle, nine-stage purified.'),
  ('b0000000-0000-0000-0000-000000000003', 'pet-1500ml',    'AQUOR Still Water 1.5L',       'pet',       'Family-size still water.'),
  ('b0000000-0000-0000-0000-000000000004', 'dispenser-19l', 'AQUOR Dispenser 18.9L',        'dispenser', 'Refill & exchange for home and office.'),
  ('b0000000-0000-0000-0000-000000000005', 'glass-750ml',   'AQUOR Reserve Glass 750ml',    'premium',   'Artisan glass for fine dining and aviation.'),
  ('b0000000-0000-0000-0000-000000000006', 'custom-500ml',  'AQUOR Custom Label 500ml',     'custom',    'Your brand on our water.'),
  ('b0000000-0000-0000-0000-000000000007', 'alkaline-750ml','AQUOR Alkaline+ 750ml',        'specialty', 'pH 8.8 alkaline hydration.');

INSERT INTO product_variants (id, product_id, sku, size_ml, pack_qty) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'AQ-SCH-50CL-B20', 500,  20),
  ('c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', 'AQ-PET-500-P20',  500,  20),
  ('c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000003', 'AQ-PET-1500-P12', 1500, 12),
  ('c0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000004', 'AQ-DSP-19L',      18900, 1),
  ('c0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000005', 'AQ-GLS-750-P6',   750,   6),
  ('c0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000006', 'AQ-CST-500-P24',  500,  24),
  ('c0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000007', 'AQ-ALK-750-P12',  750,  12);

INSERT INTO prices (variant_id, price_list_id, unit_amount, min_qty) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001',  400, 1),
  ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002',  320, 50),
  ('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 3500, 1),
  ('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 2900, 100),
  ('c0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 4200, 1),
  ('c0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 4500, 1),
  ('c0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 9000, 1),
  ('c0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000003',   18, 50),
  ('c0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000002', 3100, 200),
  ('c0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000001', 6500, 1);

-- Plants
INSERT INTO plants (id, name, city, capacity_bph) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'Lagos Plant 1',  'Lagos',   81000),
  ('d0000000-0000-0000-0000-000000000002', 'Abuja Plant',    'Abuja',   54000),
  ('d0000000-0000-0000-0000-000000000003', 'Accra Plant',    'Accra',   36000);

-- Certificates
INSERT INTO certificates (code, standard, issuer, scope, issued_on, expires_on) VALUES
  ('AQR-ISO9001-2025-0042',  'ISO 9001:2015',  'SGS',      'Lagos Plant 1 — all lines',      '2025-03-01', '2028-02-28'),
  ('AQR-ISO22000-2025-0107', 'ISO 22000:2018', 'Bureau Veritas', 'All facilities',           '2025-01-15', '2028-01-14'),
  ('AQR-FSSC-2024-0311',     'FSSC 22000 v6',  'DNV',      'Lagos & Abuja plants',           '2024-09-01', '2027-08-31'),
  ('AQR-NAFDAC-2026-0001',   'NAFDAC Registration', 'NAFDAC', 'All product lines',           '2026-01-01', '2030-12-31');

-- Water supply (AQUOR Flow)
INSERT INTO water_schemes (id, name, kind, city, commissioned_on) VALUES
  ('f0000000-0000-0000-0000-000000000001', 'Lekki Phase 1 Network',   'municipal',   'Lagos', '2023-05-01'),
  ('f0000000-0000-0000-0000-000000000002', 'Emerald Gardens Estate',  'estate',      'Abuja', '2024-08-15'),
  ('f0000000-0000-0000-0000-000000000003', 'St. Mary Teaching Hospital', 'institution', 'Enugu', '2025-02-01');

INSERT INTO water_tariffs (name, min_m3, max_m3, rate_per_m3, currency, effective) VALUES
  ('lifeline',   0,  6,    280, 'NGN', daterange('2026-01-01', NULL)),
  ('standard',   6,  20,   350, 'NGN', daterange('2026-01-01', NULL)),
  ('comfort',    20, 50,   420, 'NGN', daterange('2026-01-01', NULL)),
  ('commercial', 50, NULL, 520, 'NGN', daterange('2026-01-01', NULL));

-- Foundation projects + impact
INSERT INTO foundation_projects (id, name, program, state, community, started_on, completed_on, summary) VALUES
  ('e0000000-0000-0000-0000-000000000001', 'Ogun River Dredging Phase II', 'dredging',    'Ogun',  'Abeokuta North', '2024-02-01', '2024-11-30', '42 km dredged; flood incidence down 61%.'),
  ('e0000000-0000-0000-0000-000000000002', 'Kano Borehole Cluster',        'water_access','Kano',  'Dala',           '2025-01-10', '2025-06-15', '38 boreholes drilled/rehabilitated.'),
  ('e0000000-0000-0000-0000-000000000003', 'Niger Delta Wetland Recovery', 'ecosystem',   'Rivers','Degema',         '2025-03-01', NULL,         'Mangrove replanting and WQI monitoring.');

INSERT INTO impact_metrics (project_id, metric, value, period, verified_by) VALUES
  ('e0000000-0000-0000-0000-000000000001', 'km_dredged',    42,    daterange('2024-02-01','2024-11-30'), 'EnvAudit LLP'),
  ('e0000000-0000-0000-0000-000000000002', 'boreholes',     38,    daterange('2025-01-10','2025-06-15'), 'WaterTrust'),
  ('e0000000-0000-0000-0000-000000000002', 'people_served', 86000, daterange('2025-01-10','2025-06-15'), 'WaterTrust'),
  ('e0000000-0000-0000-0000-000000000003', 'wqi',           74,    daterange('2025-03-01','2025-12-31'), 'AquaLab');

COMMIT;
