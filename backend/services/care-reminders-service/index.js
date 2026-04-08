import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { executeQuery } from '../../shared/database/connection.js';
import { validateReminderInput } from '../../shared/validation.js';

const app = express();
const PORT = process.env.CARE_REMINDERS_PORT || 3004;

app.use(cors());
app.use(express.json());

// Get all care reminders
app.get('/api/care-reminders', async (req, res) => {
  try {
    const reminders = await executeQuery(
      `SELECT cr.*, plants.name, plants.image_url 
       FROM care_reminders cr 
       JOIN plants ON cr.plant_id = plants.id 
       ORDER BY cr.next_due_date ASC`
    );
    res.json(reminders);
  } catch (error) {
    console.error('Error fetching care reminders:', error);
    res.status(500).json({ error: 'Failed to fetch care reminders' });
  }
});

// Get care reminders for specific plant
app.get('/api/care-reminders/plant/:plantId', async (req, res) => {
  try {
    const { plantId } = req.params;
    const reminders = await executeQuery(
      `SELECT cr.*, plants.name 
       FROM care_reminders cr 
       JOIN plants ON cr.plant_id = plants.id 
       WHERE cr.plant_id = ? AND cr.is_active = TRUE`,
      [plantId]
    );
    res.json(reminders);
  } catch (error) {
    console.error('Error fetching care reminders:', error);
    res.status(500).json({ error: 'Failed to fetch care reminders' });
  }
});

// Get upcoming reminders (due within 7 days)
app.get('/api/care-reminders/upcoming', async (req, res) => {
  try {
    const reminders = await executeQuery(
      `SELECT cr.*, plants.name, plants.image_url 
       FROM care_reminders cr 
       JOIN plants ON cr.plant_id = plants.id 
       WHERE cr.next_due_date <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)
       AND cr.next_due_date >= CURDATE()
       AND cr.is_active = TRUE
       ORDER BY cr.next_due_date ASC`
    );
    res.json(reminders);
  } catch (error) {
    console.error('Error fetching upcoming reminders:', error);
    res.status(500).json({ error: 'Failed to fetch upcoming reminders' });
  }
});

// Create care reminder
app.post('/api/care-reminders', async (req, res) => {
  try {
    const validation = validateReminderInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ error: 'Validation failed', details: validation.errors });
    }
    
    const { plant_id, reminder_type, frequency, next_due_date, description } = req.body;
    
    const result = await executeQuery(
      `INSERT INTO care_reminders (plant_id, reminder_type, frequency, next_due_date, description) 
       VALUES (?, ?, ?, ?, ?)`,
      [plant_id, reminder_type, frequency, next_due_date, description]
    );
    
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error('Error creating care reminder:', error);
    res.status(500).json({ error: 'Failed to create care reminder' });
  }
});

// Mark reminder as completed
app.patch('/api/care-reminders/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const today = new Date().toISOString().split('T')[0];
    
    // Get current reminder to calculate next due date
    const reminders = await executeQuery('SELECT * FROM care_reminders WHERE id = ?', [id]);
    if (reminders.length === 0) {
      return res.status(404).json({ error: 'Reminder not found' });
    }
    
    // Simple next due date calculation (add 7 days for weekly, 30 for monthly, etc.)
    let nextDueDate = new Date(today);
    const frequency = reminders[0].frequency;
    
    if (frequency.includes('Weekly') || frequency.includes('week')) {
      nextDueDate.setDate(nextDueDate.getDate() + 7);
    } else if (frequency.includes('Monthly') || frequency.includes('month')) {
      nextDueDate.setDate(nextDueDate.getDate() + 30);
    } else if (frequency.includes('Quarterly') || frequency.includes('quarter')) {
      nextDueDate.setDate(nextDueDate.getDate() + 90);
    }
    
    const nextDueDateStr = nextDueDate.toISOString().split('T')[0];
    
    await executeQuery(
      'UPDATE care_reminders SET last_performed = ?, next_due_date = ? WHERE id = ?',
      [today, nextDueDateStr, id]
    );
    
    res.json({ success: true, id, last_performed: today, next_due_date: nextDueDateStr });
  } catch (error) {
    console.error('Error completing reminder:', error);
    res.status(500).json({ error: 'Failed to complete reminder' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Care Reminders Service OK' });
});

export const createCareRemindersService = () => {
  return new Promise((resolve) => {
    app.listen(PORT, () => {
      console.log(`🌱 Care Reminders Service running on port ${PORT}`);
      resolve();
    });
  });
};
