import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { executeQuery } from '../../shared/database/connection.js';
import { validatePlantInput } from '../../shared/validation.js';

const app = express();
const PORT = process.env.CATALOG_PORT || 3001;

app.use(cors());
app.use(express.json());

// Get all plants
app.get('/api/plants', async (req, res) => {
  try {
    const plants = await executeQuery('SELECT * FROM plants');
    res.json(plants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
});

// Get single plant by ID
app.get('/api/plants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const plants = await executeQuery('SELECT * FROM plants WHERE id = ?', [id]);
    if (plants.length === 0) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.json(plants[0]);
  } catch (error) {
    console.error('Error fetching plant:', error);
    res.status(500).json({ error: 'Failed to fetch plant' });
  }
});

// Get plants by category
app.get('/api/plants/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const plants = await executeQuery('SELECT * FROM plants WHERE category = ?', [category]);
    res.json(plants);
  } catch (error) {
    console.error('Error fetching plants by category:', error);
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
});

// Create new plant (for testing)
app.post('/api/plants', async (req, res) => {
  try {
    const validation = validatePlantInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ error: 'Validation failed', details: validation.errors });
    }
    
    const { name, scientific_name, description, price, category, light_requirements, water_frequency, humidity_level, image_url } = req.body;
    const result = await executeQuery(
      'INSERT INTO plants (name, scientific_name, description, price, category, light_requirements, water_frequency, humidity_level, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, scientific_name, description, price, category, light_requirements, water_frequency, humidity_level, image_url]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error('Error creating plant:', error);
    res.status(500).json({ error: 'Failed to create plant' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Catalog Service OK' });
});

export const createCatalogService = () => {
  return new Promise((resolve) => {
    app.listen(PORT, () => {
      console.log(`🌿 Catalog Service running on port ${PORT}`);
      resolve();
    });
  });
};
