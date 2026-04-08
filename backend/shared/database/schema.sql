-- Create Database
DROP DATABASE IF EXISTS paradise_plants;
CREATE DATABASE paradise_plants CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE paradise_plants;

-- Plants/Catalog Table
CREATE TABLE plants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  scientific_name VARCHAR(255),
  description TEXT,
  price DECIMAL(10, 2),
  image_url VARCHAR(500),
  category VARCHAR(100),
  light_requirements VARCHAR(100),
  water_frequency VARCHAR(100),
  humidity_level VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inventory Table
CREATE TABLE inventory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  plant_id INT NOT NULL,
  quantity_in_stock INT DEFAULT 0,
  reorder_level INT DEFAULT 10,
  last_restocked TIMESTAMP,
  supplier VARCHAR(255),
  storage_location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE
);

-- Orders Table
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  total_amount DECIMAL(10, 2),
  status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  shipping_address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  plant_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2),
  subtotal DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (plant_id) REFERENCES plants(id)
);

-- Care Reminders Table
CREATE TABLE care_reminders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  plant_id INT NOT NULL,
  reminder_type ENUM('watering', 'fertilizing', 'pruning', 'repotting', 'inspection') NOT NULL,
  frequency VARCHAR(100),
  last_performed DATE,
  next_due_date DATE,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE
);

-- Create Indexes
CREATE INDEX idx_plants_category ON plants(category);
CREATE INDEX idx_inventory_plant_id ON inventory(plant_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_care_reminders_plant_id ON care_reminders(plant_id);
CREATE INDEX idx_care_reminders_due_date ON care_reminders(next_due_date);
