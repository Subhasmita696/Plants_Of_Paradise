import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { initializeDatabase } from './shared/database/connection.js';

// Microservices
import { createCatalogService } from './services/catalog-service/index.js';
import { createInventoryService } from './services/inventory-service/index.js';
import { createOrdersService } from './services/orders-service/index.js';
import { createCareRemindersService } from './services/care-reminders-service/index.js';

const PORT = process.env.PORT || 3000;

const startBackend = async () => {
  try {
    // Initialize database
    await initializeDatabase();
    console.log('📦 Database initialized');

    // Start individual microservices
    await createCatalogService();
    await createInventoryService();
    await createOrdersService();
    await createCareRemindersService();

    console.log('🎉 All microservices started successfully!');
    console.log('📍 Available services:');
    console.log(`   - Catalog Service: http://localhost:${process.env.CATALOG_PORT}`);
    console.log(`   - Inventory Service: http://localhost:${process.env.INVENTORY_PORT}`);
    console.log(`   - Orders Service: http://localhost:${process.env.ORDERS_PORT}`);
    console.log(`   - Care Reminders Service: http://localhost:${process.env.CARE_REMINDERS_PORT}`);
  } catch (error) {
    console.error('❌ Error starting backend:', error);
    process.exit(1);
  }
};

startBackend();
