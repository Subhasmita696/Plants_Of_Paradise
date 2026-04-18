USE paradise_plants;

-- Insert Plant Data
INSERT INTO plants (name, scientific_name, description, price, category, light_requirements, water_frequency, humidity_level, image_url) VALUES
('Monstera Deliciosa', 'Monstera deliciosa', 'Large tropical plant with stunning holes in leaves', 45.99, 'Tropical', 'Bright Indirect', 'Weekly', 'High', '/images/monstera.jpg'),
('Pothos (Devil''s Ivy)', 'Epipremnum aureum', 'Trailing vine with heart-shaped leaves', 12.99, 'Indoor', 'Low to Bright', 'Every 2 weeks', 'Medium', '/images/pothos.jpg'),
('Snake Plant', 'Sansevieria trifasciata', 'Low maintenance succulent with striking vertical leaves', 19.99, 'Succulent', 'Low to Bright', 'Monthly', 'Low', '/images/snake-plant.jpg'),
('Fiddle Leaf Fig', 'Ficus lyrata', 'Statement plant with large, violin-shaped leaves', 55.00, 'Tropical', 'Bright Indirect', 'Weekly', 'Medium', '/images/fiddle-leaf.jpg'),
('ZZ Plant', 'Zamioculcas zamiifolia', 'Extremely low maintenance plant with glossy leaflets', 24.99, 'Indoor', 'Low to Medium', 'Every 3 weeks', 'Low', '/images/zz-plant.jpg'),
('Philodendron Heart Leaf', 'Philodendron hederaceum', 'Heart-shaped leaves, trailing or climbing growth', 14.99, 'Indoor', 'Low to Bright', 'Every 1-2 weeks', 'Medium', '/images/philodendron-heart-leaf.jpg'),
('Rubber Plant', 'Ficus elastica', 'Majestic plant with thick, dark green leaves', 35.50, 'Tropical', 'Bright Indirect', 'Weekly', 'Medium', '/images/rubber-plant.jpg'),
('Spider Plant', 'Chlorophytum comosum', 'Variegated leaves with dangling plantlets', 16.99, 'Indoor', 'Medium to Bright', 'Every 1-2 weeks', 'Medium', '/images/spider-plant.jpg'),
('Alocasia', 'Alocasia amazonica', 'Striking plant with arrow-shaped leaves and distinctive veining', 32.99, 'Tropical', 'Bright Indirect', 'Weekly', 'High', '/images/alocasia.jpg'),
('Orchid', 'Orchidaceae', 'Exotic flowering plant in various colors', 29.99, 'Flowering', 'Bright Indirect', 'Weekly', 'High', '/images/orchid-plant.jpg'),
('Hibiscus', 'Hibiscus rosa-sinensis', 'Bold tropical blooms that add bright color to any flowering collection.', 27.99, 'Flowering', 'Bright Direct', 'Every 3-4 days', 'Medium', '/images/Hibiscus.jpg'),
('Lavender', 'Lavandula angustifolia', 'Fragrant flowering herb with soft purple blooms and silvery foliage.', 18.99, 'Flowering', 'Bright Direct', 'Weekly', 'Low', '/images/Lavender.jpg'),
('Peony', 'Paeonia lactiflora', 'Lush layered blossoms with a soft romantic look and seasonal flowering habit.', 31.99, 'Flowering', 'Bright Indirect', 'Every 4-5 days', 'Medium', '/images/Peony.jpg'),
('Tulip', 'Tulipa gesneriana', 'Classic cup-shaped blooms that bring vivid spring color indoors.', 16.49, 'Flowering', 'Bright Indirect', 'Every 4-5 days', 'Medium', '/images/Tulip.jpg');

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
(10, 18, 10, 'Rare Orchids Ltd', 'Shelf D1'),
(11, 14, 8, 'Tropical Blooms Co', 'Shelf D2'),
(12, 20, 10, 'Herbal Garden Supply', 'Shelf D3'),
(13, 9, 6, 'Seasonal Blossoms Ltd', 'Shelf D4'),
(14, 24, 12, 'Spring Color Nursery', 'Shelf D5');

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
(1, 'watering', 'Weekly', DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 5 DAY), 'Water when top inch of soil is dry', TRUE),
(1, 'fertilizing', 'Monthly', DATE_SUB(CURDATE(), INTERVAL 20 DAY), DATE_ADD(CURDATE(), INTERVAL 6 DAY), 'Use balanced fertilizer', TRUE),
(2, 'watering', 'Every 1-2 weeks', DATE_SUB(CURDATE(), INTERVAL 5 DAY), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 'Keep soil moist but not soggy', TRUE),
(3, 'watering', 'Monthly', DATE_SUB(CURDATE(), INTERVAL 22 DAY), DATE_ADD(CURDATE(), INTERVAL 7 DAY), 'Allow soil to dry between waterings', TRUE),
(4, 'watering', 'Weekly', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 4 DAY), 'Bright indirect light is essential', TRUE),
(4, 'pruning', 'Quarterly', DATE_SUB(CURDATE(), INTERVAL 60 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 'Remove dead leaves and dust', TRUE),
(5, 'watering', 'Every 3 weeks', DATE_SUB(CURDATE(), INTERVAL 10 DAY), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 'Very drought tolerant', TRUE),
(10, 'watering', 'Weekly', DATE_SUB(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 'Orchids need careful watering', TRUE),
(10, 'fertilizing', 'Every 2 weeks', DATE_SUB(CURDATE(), INTERVAL 7 DAY), DATE_ADD(CURDATE(), INTERVAL 4 DAY), 'Use orchid-specific fertilizer', TRUE);
