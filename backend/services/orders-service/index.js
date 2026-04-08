import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { executeQuery } from '../../shared/database/connection.js';
import { validateOrderInput } from '../../shared/validation.js';

const app = express();
const PORT = process.env.ORDERS_PORT || 3003;

app.use(cors());
app.use(express.json());

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await executeQuery(
      `SELECT * FROM orders ORDER BY created_at DESC`
    );
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get order by ID with items
app.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await executeQuery('SELECT * FROM orders WHERE id = ?', [id]);
    if (orders.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    const items = await executeQuery(
      `SELECT oi.*, plants.name, plants.image_url 
       FROM order_items oi 
       JOIN plants ON oi.plant_id = plants.id 
       WHERE oi.order_id = ?`,
      [id]
    );
    
    res.json({ ...orders[0], items });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const validation = validateOrderInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ error: 'Validation failed', details: validation.errors });
    }
    
    const { customer_name, customer_email, customer_phone, items, shipping_address } = req.body;
    
    // Generate order number
    const timestamp = Date.now();
    const order_number = `ORD-${timestamp}`;
    
    // Calculate total
    let total_amount = 0;
    
    // Insert order
    const orderResult = await executeQuery(
      `INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, total_amount, shipping_address) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [order_number, customer_name, customer_email, customer_phone, 0, shipping_address]
    );
    
    const orderId = orderResult.insertId;
    
    // Insert order items
    for (const item of items) {
      const subtotal = item.quantity * item.unit_price;
      total_amount += subtotal;
      
      await executeQuery(
        `INSERT INTO order_items (order_id, plant_id, quantity, unit_price, subtotal) 
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.plant_id, item.quantity, item.unit_price, subtotal]
      );
    }
    
    // Update order total
    await executeQuery(
      'UPDATE orders SET total_amount = ? WHERE id = ?',
      [total_amount, orderId]
    );
    
    res.status(201).json({ id: orderId, order_number, total_amount });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update order status
app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    await executeQuery(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, id]
    );
    res.json({ success: true, id, status });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Orders Service OK' });
});

export const createOrdersService = () => {
  return new Promise((resolve) => {
    app.listen(PORT, () => {
      console.log(`📋 Orders Service running on port ${PORT}`);
      resolve();
    });
  });
};
