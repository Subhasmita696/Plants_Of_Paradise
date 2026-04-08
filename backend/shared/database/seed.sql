USE paradise_plants;

-- Insert Plant Data
INSERT INTO plants (name, scientific_name, description, price, category, light_requirements, water_frequency, humidity_level, image_url) VALUES
('Monstera Deliciosa', 'Monstera deliciosa', 'Large tropical plant with stunning holes in leaves', 45.99, 'Tropical', 'Bright Indirect', 'Weekly', 'High', 'https://images.unsplash.com/photo-1610186673557-55827760d54d?w=400'),
('Pothos (Devil''s Ivy)', 'Epipremnum aureum', 'Trailing vine with heart-shaped leaves', 12.99, 'Indoor', 'Low to Bright', 'Every 2 weeks', 'Medium', 'https://images.unsplash.com/photo-1612771848375-e6490216da8d?w=400'),
('Snake Plant', 'Sansevieria trifasciata', 'Low maintenance succulent with striking vertical leaves', 19.99, 'Succulent', 'Low to Bright', 'Monthly', 'Low', 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400'),
('Fiddle Leaf Fig', 'Ficus lyrata', 'Statement plant with large, violin-shaped leaves', 55.00, 'Tropical', 'Bright Indirect', 'Weekly', 'Medium', 'https://images.unsplash.com/photo-1522701518895-da034126cb12?w=400'),
('ZZ Plant', 'Zamioculcas zamiifolia', 'Extremely low maintenance plant with glossy leaflets', 24.99, 'Indoor', 'Low to Medium', 'Every 3 weeks', 'Low', 'https://images.unsplash.com/photo-1612207188884-33c348dd9cb4?w=400'),
('Philodendron Heart Leaf', 'Philodendron hederaceum', 'Heart-shaped leaves, trailing or climbing growth', 14.99, 'Indoor', 'Low to Bright', 'Every 1-2 weeks', 'Medium', 'https://images.unsplash.com/photo-1613818202407-64ee90588892?w=400'),
('Rubber Plant', 'Ficus elastica', 'Majestic plant with thick, dark green leaves', 35.50, 'Tropical', 'Bright Indirect', 'Weekly', 'Medium', 'https://images.unsplash.com/photo-1465056836643-15cea6ccd14d?w=400'),
('Spider Plant', 'Chlorophytum comosum', 'Variegated leaves with dangling plantlets', 16.99, 'Indoor', 'Medium to Bright', 'Every 1-2 weeks', 'Medium', 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400'),
('Alocasia', 'Alocasia amazonica', 'Striking plant with arrow-shaped leaves and distinctive veining', 32.99, 'Tropical', 'Bright Indirect', 'Weekly', 'High', 'https://images.unsplash.com/photo-1612207736597-de2d4265fba3?w=400'),
('Orchid', 'Orchidaceae', 'Exotic flowering plant in various colors', 29.99, 'Flowering', 'Bright Indirect', 'Weekly', 'High', 'https://images.unsplash.com/photo-1585124916852-22fdf4b60814?w=400');

-- Insert Inventory Data
INSERT INTO inventory (plant_id, quantity_in_stock, reorder_level, supplier, storage_location) VALUES
(1, 15, 10, 'Tropical Nursery Co', 'Shelf A1'),
(2, 30, 15, 'Indoor Plants Inc', 'Shelf B2'),
(3, 45, 20, 'Succulent Paradise', 'Shelf C3'),
(4, 8, 5, 'Tropical Nursery Co', 'Shelf A2'),
(5, 25, 12, 'ZZ Specialists', 'Shelf B1'),
(6, 20, 10, 'Indoor Plants Inc', 'Shelf B3'),
(7, 12, 8, 'Tropical Nursery Co', 'Shelf A3'),
(8, 35, 18, 'Indoor Plants Inc', 'Shelf B4'),
(9, 10, 8, 'Tropical Nursery Co', 'Shelf A4'),
(10, 18, 10, 'Rare Orchids Ltd', 'Shelf D1');

-- Insert Sample Order
INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, total_amount, status, shipping_address) VALUES
('ORD-001', 'John Doe', 'john@example.com', '555-0101', 89.97, 'delivered', '123 Main St, Anytown, USA'),
('ORD-002', 'Jane Smith', 'jane@example.com', '555-0102', 45.99, 'shipped', '456 Oak Ave, Springfield, USA'),
('ORD-003', 'Bob Johnson', 'bob@example.com', '555-0103', 139.96, 'confirmed', '789 Pine Rd, Shelbyville, USA');

-- Insert Order Items
INSERT INTO order_items (order_id, plant_id, quantity, unit_price, subtotal) VALUES
(1, 2, 1, 12.99, 12.99),
(1, 5, 2, 24.99, 49.98),
(1, 8, 1, 16.99, 16.99),
(2, 1, 1, 45.99, 45.99),
(3, 3, 2, 19.99, 39.98),
(3, 6, 1, 14.99, 14.99),
(3, 7, 2, 35.50, 71.00);

-- Insert Care Reminders
INSERT INTO care_reminders (plant_id, reminder_type, frequency, last_performed, next_due_date, description, is_active) VALUES
(1, 'watering', 'Weekly', '2026-04-01', '2026-04-08', 'Water when top inch of soil is dry', TRUE),
(1, 'fertilizing', 'Monthly', '2026-03-01', '2026-04-01', 'Use balanced fertilizer', TRUE),
(2, 'watering', 'Every 1-2 weeks', '2026-04-05', '2026-04-12', 'Keep soil moist but not soggy', TRUE),
(3, 'watering', 'Monthly', '2026-03-15', '2026-04-15', 'Allow soil to dry between waterings', TRUE),
(4, 'watering', 'Weekly', '2026-04-01', '2026-04-08', 'Bright indirect light is essential', TRUE),
(4, 'pruning', 'Quarterly', '2026-01-15', '2026-04-15', 'Remove dead leaves and dust', TRUE),
(5, 'watering', 'Every 3 weeks', '2026-03-20', '2026-04-10', 'Very drought tolerant', TRUE),
(10, 'watering', 'Weekly', '2026-04-02', '2026-04-09', 'Orchids need careful watering', TRUE),
(10, 'fertilizing', 'Every 2 weeks', '2026-03-25', '2026-04-08', 'Use orchid-specific fertilizer', TRUE);
