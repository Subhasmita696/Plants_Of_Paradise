import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { executeQuery } from '../../shared/database/connection.js';
import { validateInventoryInput } from '../../shared/validation.js';

const app = express();
const PORT = process.env.INVENTORY_PORT || 3002;

app.use(cors());
app.use(express.json());

// Get all inventory
app.get('/api/inventory', async (req, res) => {
  try {
    const inventory = await executeQuery(
      `SELECT inv.*, plants.name, plants.price 
       FROM inventory inv 
       JOIN plants ON inv.plant_id = plants.id`
    );
    res.json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// Get inventory for specific plant
app.get('/api/inventory/:plantId', async (req, res) => {
  try {
    const { plantId } = req.params;
    const inventory = await executeQuery(
      `SELECT inv.*, plants.name 
       FROM inventory inv 
       JOIN plants ON inv.plant_id = plants.id 
       WHERE inv.plant_id = ?`,
      [plantId]
    );
    if (inventory.length === 0) {
      return res.status(404).json({ error: 'Inventory not found' });
    }
    res.json(inventory[0]);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// Get low stock items
app.get('/api/inventory/low-stock', async (req, res) => {
  try {
    const lowStock = await executeQuery(
      `SELECT inv.*, plants.name 
       FROM inventory inv 
       JOIN plants ON inv.plant_id = plants.id 
       WHERE inv.quantity_in_stock <= inv.reorder_level`
    );
    res.json(lowStock);
  } catch (error) {
    console.error('Error fetching low stock:', error);
    res.status(500).json({ error: 'Failed to fetch low stock items' });
  }
});

// Update inventory quantity
app.patch('/api/inventory/:plantId', async (req, res) => {
  try {
    const validation = validateInventoryInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ error: 'Validation failed', details: validation.errors });
    }
    
    const { plantId } = req.params;
    const { quantity_in_stock } = req.body;
    
    await executeQuery(
      'UPDATE inventory SET quantity_in_stock = ? WHERE plant_id = ?',
      [quantity_in_stock, plantId]
    );
    res.json({ success: true, plantId, quantity_in_stock });
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).json({ error: 'Failed to update inventory' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Inventory Service OK' });
});

export const createInventoryService = () => {
  return new Promise((resolve) => {
    app.listen(PORT, () => {
      console.log(`📦 Inventory Service running on port ${PORT}`);
      resolve();
    });
  });
};
