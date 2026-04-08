# 🌿 Paradise Plants - Complete Plant E-commerce Platform

A modern, full-stack microservices-based e-commerce platform for selling and managing plants. Built with React, Node.js, Express, MySQL, and Docker.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Features](#features)
5. [Project Structure](#project-structure)
6. [Quick Start](#quick-start)
7. [Installation](#installation)
8. [Usage](#usage)
9. [API Documentation](#api-documentation)
10. [Database Schema](#database-schema)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)
13. [Contributing](#contributing)

---

## 🌍 Project Overview

**Paradise Plants** is a complete e-commerce platform designed for plant retailers and enthusiasts. It provides:

- **Product Catalog** - Browse and search through a diverse plant inventory
- **Inventory Management** - Real-time stock tracking with low-stock alerts
- **Order Management** - Complete order lifecycle from creation to delivery
- **Care Reminders** - Personalized plant care schedules and notifications
- **Responsive UI** - Beautiful, mobile-friendly interface

The platform uses a **microservices architecture** to ensure scalability, maintainability, and independent service deployment.

---

## 🏗️ Architecture

### Overall System Design

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Pages: Catalog, Inventory, Orders, Care Reminders  │   │
│  │  Components: Plant Cards, Status Badges, Charts     │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST API
      ┌──────────────┼──────────────┬────────────────────┐
      ▼              ▼              ▼                    ▼
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐
│ Catalog  │  │Inventory │  │  Orders  │  │Care Reminders│
│Service   │  │Service   │  │Service   │  │Service       │
│(3001)    │  │(3002)    │  │(3003)    │  │(3004)        │
└────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────────┘
     │             │             │             │
     └─────────────┴─────────────┴─────────────┘
                    │
                    ▼
           ┌────────────────┐
           │   MySQL 8.0    │
           │   Database     │
           └────────────────┘
```

### Microservices Architecture

| Service | Port | Purpose | Dependencies |
|---------|------|---------|--------------|
| **Catalog Service** | 3001 | Product catalog & search | MySQL |
| **Inventory Service** | 3002 | Stock management | MySQL |
| **Orders Service** | 3003 | Order processing | MySQL, Inventory Service |
| **Care Reminders Service** | 3004 | Plant care scheduling | MySQL |

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Animations**: Framer Motion
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router v6
- **Form Handling**: React Hook Form
- **Package Manager**: Bun

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: JavaScript (ES6+)
- **Database**: MySQL 8.0
- **API Style**: RESTful
- **Containerization**: Docker & Docker Compose

### DevTools
- **Testing**: Vitest, Playwright
- **Linting**: ESLint
- **Database Management**: MySQL Workbench (optional)
- **API Testing**: Postman

---

## ✨ Features

### 🌿 Catalog Management
- ✅ Browse all available plants
- ✅ Search by plant name or scientific name
- ✅ Filter by category (Tropical, Indoor, Succulent, Flowering)
- ✅ View detailed plant information
- ✅ Real-time price display

### 📦 Inventory Tracking
- ✅ Real-time stock level monitoring
- ✅ Low stock alerts
- ✅ Supplier information
- ✅ Storage location tracking
- ✅ Reorder level management
- ✅ Stock quantity updates

### 📋 Order Management
- ✅ Create orders with multiple items
- ✅ Track order status (pending, confirmed, shipped, delivered, cancelled)
- ✅ Customer information management
- ✅ Order total calculation
- ✅ Shipping address tracking
- ✅ Order history and statistics

### 🌱 Care Reminders
- ✅ Schedule plant care tasks
- ✅ Multiple reminder types (watering, fertilizing, pruning, repotting, inspection)
- ✅ View upcoming reminders (next 7 days)
- ✅ Mark reminders as completed
- ✅ Auto-calculate next due dates
- ✅ Care instructions and frequency

### 💡 Additional Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark/Light mode support
- ✅ Error handling & validation
- ✅ Loading states & skeletons
- ✅ Caching & optimized requests
- ✅ Retry logic for failed requests

---

## 📁 Project Structure

```
paradise-plants/
├── frontend/
│   ├── src/
│   │   ├── api/                    # API integration
│   │   │   ├── client.ts          # API client with interceptors
│   │   │   ├── hooks/             # React hooks
│   │   │   │   └── useApi.ts      # Custom hooks (useCatalog, useOrders, etc.)
│   │   │   └── utils.ts           # Error handling & validation
│   │   │
│   │   ├── components/             # React components
│   │   │   ├── Layout.tsx
│   │   │   ├── NavLink.tsx
│   │   │   ├── PlantCard.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── ui/                # shadcn/ui components
│   │   │
│   │   ├── pages/                  # Page components
│   │   │   ├── Index.tsx
│   │   │   ├── Catalog.tsx        # Plant listing page
│   │   │   ├── Inventory.tsx      # Stock management page
│   │   │   ├── Orders.tsx         # Order management page
│   │   │   ├── CareReminders.tsx  # Care schedule page
│   │   │   └── NotFound.tsx
│   │   │
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── lib/                    # Utilities
│   │   ├── data/                   # Mock data
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── public/                     # Static assets
│   ├── .env.example               # Environment template
│   ├── vite.config.ts
│   └── package.json
│
├── backend/
│   ├── services/
│   │   ├── catalog-service/
│   │   │   └── index.js           # Catalog API endpoints
│   │   ├── inventory-service/
│   │   │   └── index.js           # Inventory API endpoints
│   │   ├── orders-service/
│   │   │   └── index.js           # Orders API endpoints
│   │   └── care-reminders-service/
│   │       └── index.js           # Care Reminders API endpoints
│   │
│   ├── shared/
│   │   └── database/
│   │       ├── connection.js      # Database connection pool
│   │       ├── schema.sql         # Database schema
│   │       └── seed.sql           # Sample data
│   │
│   ├── docs/
│   │   ├── API.md                 # API documentation
│   │   ├── openapi.json           # OpenAPI specification
│   │   └── paradise-plants-api.postman_collection.json
│   │
│   ├── index.js                   # Main server entry point
│   ├── .env                       # Local configuration
│   ├── .env.docker               # Docker configuration
│   ├── docker-compose.yml        # Docker setup
│   ├── Dockerfile.service        # Service container
│   └── package.json
│
├── .gitignore
├── README.md                      # This file
└── docker-compose.yml            # Root compose file (optional)
```

---

## 🚀 Quick Start

### Option 1: Docker (Recommended)

**Prerequisites:**
- Docker & Docker Compose installed

**Steps:**

```bash
# 1. Clone the repository
git clone https://github.com/your-repo/paradise-plants.git
cd paradise-plants

# 2. Start all services with Docker Compose
docker-compose up -d

# 3. Wait for services to be healthy (30 seconds)
docker-compose ps

# 4. Access the application
Frontend:  http://localhost:5173
Catalog:   http://localhost:3001
Inventory: http://localhost:3002
Orders:    http://localhost:3003
Care:      http://localhost:3004
```

### Option 2: Local Development

**Prerequisites:**
- Node.js 20+
- MySQL 8.0+
- Bun (optional, can use npm)

**Backend Setup:**

```bash
# 1. Setup database
cd backend
mysql -u root -p < shared/database/schema.sql
mysql -u root -p paradise_plants < shared/database/seed.sql

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.local .env
# Edit .env with your DB credentials

# 4. Start all services
npm run dev
```

**Frontend Setup:**

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Update API URLs if needed

# 3. Start dev server
npm run dev
```

---

## 📖 Installation

### Prerequisites

Verify installations:

```bash
# Check Node.js
node --version  # v20.0.0 or higher

# Check npm
npm --version   # 9.0.0 or higher

# Check Docker (if using Docker)
docker --version
docker-compose --version
```

### Backend Installation

```bash
cd backend

# 1. Install npm packages
npm install

# 2. Create environment file
cp .env .env
# Update with your settings

# 3. Setup database
# For MySQL running locally:
mysql -u root -p < shared/database/schema.sql
mysql -u root -p paradise_plants < shared/database/seed.sql

# 4. Start services
npm run dev

# All services should now be running:
# ✓ Catalog Service: http://localhost:3001
# ✓ Inventory Service: http://localhost:3002
# ✓ Orders Service: http://localhost:3003
# ✓ Care Reminders: http://localhost:3004
```

### Frontend Installation

```bash
# 1. Install packages
npm install

# 2. Create environment file
cp .env.example .env.local

# 3. Start development server
npm run dev

# Navigate to http://localhost:5173
```

---

## 💻 Usage

### Accessing the Application

#### **Frontend (User Interface)**

1. **Homepage** - Dashboard with quick stats
   ```
   http://localhost:5173/
   ```

2. **Catalog** - Browse and search plants
   ```
   http://localhost:5173/catalog
   - Search by name
   - Filter by category
   - View plant details
   ```

3. **Inventory** - Monitor stock levels
   ```
   http://localhost:5173/inventory
   - View current stock
   - See low stock alerts
   - Check suppliers
   ```

4. **Orders** - Manage customer orders
   ```
   http://localhost:5173/orders
   - View all orders
   - Check order status
   - See order details & items
   - Track revenue
   ```

5. **Care Reminders** - Schedule plant care
   ```
   http://localhost:5173/care
   - View upcoming reminders
   - Mark tasks complete
   - See care instructions
   ```

### Using the API Directly

#### **Test with cURL**

```bash
# Get all plants
curl http://localhost:3001/api/plants

# Get inventory
curl http://localhost:3002/api/inventory

# Check service health
curl http://localhost:3001/health
curl http://localhost:3002/health
curl http://localhost:3003/health
curl http://localhost:3004/health
```

#### **Using Postman**

1. Import collection: `backend/docs/paradise-plants-api.postman_collection.json`
2. Set environment variables:
   - `CATALOG_URL`: http://localhost:3001
   - `INVENTORY_URL`: http://localhost:3002
   - `ORDERS_URL`: http://localhost:3003
   - `CARE_REMINDERS_URL`: http://localhost:3004
3. Test any endpoint from the collection

### Using React Hooks in Components

```typescript
import { useCatalog, useOrders, useInventory } from '@/api/hooks/useApi';

export function MyComponent() {
  // Get plants with loading & error states
  const { plants, loading, error, fetchAllPlants } = useCatalog();

  useEffect(() => {
    fetchAllPlants();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {plants.map(plant => (
        <div key={plant.id}>{plant.name} - ${plant.price}</div>
      ))}
    </div>
  );
}
```

---

## 📡 API Documentation

### Base URLs

**Local Development:**
```
Catalog:        http://localhost:3001
Inventory:      http://localhost:3002
Orders:         http://localhost:3003
Care Reminders: http://localhost:3004
```

**Docker:**
```
Catalog:        http://catalog-service:3001
Inventory:      http://inventory-service:3002
Orders:         http://orders-service:3003
Care Reminders: http://care-reminders-service:3004
```

### Core Endpoints

#### **Catalog Service (Port 3001)**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/plants` | Get all plants |
| GET | `/api/plants/:id` | Get single plant |
| GET | `/api/plants/category/:category` | Filter by category |
| POST | `/api/plants` | Create new plant |
| GET | `/health` | Service status |

**Example: Get all plants**
```bash
curl http://localhost:3001/api/plants
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Monstera Deliciosa",
    "scientific_name": "Monstera deliciosa",
    "price": 45.99,
    "category": "Tropical",
    "light_requirements": "Bright Indirect",
    "water_frequency": "Weekly",
    "humidity_level": "High",
    "image_url": "https://..."
  }
]
```

#### **Inventory Service (Port 3002)**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/inventory` | Get all inventory |
| GET | `/api/inventory/:plantId` | Get plant stock |
| GET | `/api/inventory/low-stock` | Get low stock items |
| PATCH | `/api/inventory/:plantId` | Update quantity |
| GET | `/health` | Service status |

**Example: Get low stock items**
```bash
curl http://localhost:3002/api/inventory/low-stock
```

#### **Orders Service (Port 3003)**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/:id` | Get order details |
| POST | `/api/orders` | Create order |
| PATCH | `/api/orders/:id/status` | Update status |
| GET | `/health` | Service status |

**Example: Create order**
```bash
curl -X POST http://localhost:3003/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "customer_phone": "555-0101",
    "shipping_address": "123 Main St",
    "items": [
      {"plant_id": 1, "quantity": 2, "unit_price": 45.99}
    ]
  }'
```

#### **Care Reminders Service (Port 3004)**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/care-reminders` | Get all reminders |
| GET | `/api/care-reminders/plant/:plantId` | Get plant reminders |
| GET | `/api/care-reminders/upcoming` | Get upcoming (7 days) |
| POST | `/api/care-reminders` | Create reminder |
| PATCH | `/api/care-reminders/:id/complete` | Mark complete |
| GET | `/health` | Service status |

**For detailed API docs, see:** [backend/docs/API.md](backend/docs/API.md)

---

## 🗄️ Database Schema

### Database: `paradise_plants`

```sql
-- Plants Catalog
CREATE TABLE plants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  scientific_name VARCHAR(255),
  description TEXT,
  price DECIMAL(10, 2),
  category VARCHAR(100),
  light_requirements VARCHAR(100),
  water_frequency VARCHAR(100),
  humidity_level VARCHAR(100),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory Stock
CREATE TABLE inventory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  plant_id INT NOT NULL FOREIGN KEY,
  quantity_in_stock INT DEFAULT 0,
  reorder_level INT DEFAULT 10,
  supplier VARCHAR(255),
  storage_location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customer Orders
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  total_amount DECIMAL(10, 2),
  status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'),
  shipping_address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Line Items
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL FOREIGN KEY,
  plant_id INT NOT NULL FOREIGN KEY,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2),
  subtotal DECIMAL(10, 2)
);

-- Plant Care Schedule
CREATE TABLE care_reminders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  plant_id INT NOT NULL FOREIGN KEY,
  reminder_type ENUM('watering', 'fertilizing', 'pruning', 'repotting', 'inspection'),
  frequency VARCHAR(100),
  last_performed DATE,
  next_due_date DATE,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Sample Data

The database is auto-seeded with:
- **10 plants** across different categories
- **3 sample orders** with varying statuses
- **9 care reminders** with different task types

---

## 🌐 Deployment

### Deploy to Production

#### **Using Docker (Recommended)**

```bash
# 1. Build images
docker-compose -f docker-compose.yml build

# 2. Deploy to server
# Using Docker Swarm, Kubernetes, or any container orchestration

# 3. Set environment variables
# Update .env.docker with production values

# 4. Start services
docker-compose -f docker-compose.yml up -d
```

#### **Environment Variables (Production)**

Create `.env.docker.prod`:

```
# Database
DB_HOST=your-db-host.amazonaws.com
DB_PORT=3306
DB_USER=prod_user
DB_PASSWORD=secure_password_here
DB_NAME=paradise_plants

# Service Ports
CATALOG_PORT=3001
INVENTORY_PORT=3002
ORDERS_PORT=3003
CARE_REMINDERS_PORT=3004

# Service URLs (for inter-service communication)
CATALOG_URL=https://api.paradise-plants.com/catalog
INVENTORY_URL=https://api.paradise-plants.com/inventory
ORDERS_URL=https://api.paradise-plants.com/orders
CARE_REMINDERS_URL=https://api.paradise-plants.com/care

# Environment
NODE_ENV=production
```

#### **Frontend Deployment (Vercel, Netlify)**

```bash
cd frontend

# Build for production
npm run build

# Deploy dist/ folder to:
# - Vercel, Netlify, AWS S3 + CloudFront, etc.
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### **1. Database Connection Error**

```
Error: Error connecting to database
```

**Solution:**
```bash
# Check MySQL is running
mysql -u root -p -e "SELECT 1"

# Verify credentials in .env
cat backend/.env

# Ensure database exists
mysql -u root -p -e "SHOW DATABASES;"
```

#### **2. Port Already in Use**

```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solution:**
```bash
# Find process using the port
lsof -i :3001

# Kill the process
kill -9 <PID>

# Or use a different port
# Update .env with different PORT
```

#### **3. API Returns 404**

```
Error: GET /api/plants → 404 Not Found
```

**Solution:**
```bash
# Check service is running
curl http://localhost:3001/health

# Verify endpoint URL
# Check API docs for correct endpoints

# Test with Postman collection
```

#### **4. CORS Errors**

```
Error: Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
```javascript
// CORS is enabled in all services
// Ensure frontend makes requests to correct URLs
// Update .env.local with correct API URLs

VITE_CATALOG_API=http://localhost:3001
VITE_INVENTORY_API=http://localhost:3002
```

#### **5. Docker Compose Fails**

```
Error: Service failed to start
```

**Solution:**
```bash
# Check logs
docker-compose logs service-name

# Rebuild containers
docker-compose down -v
docker-compose up --build

# Verify Docker is running
docker ps
```

### Debugging Tips

```bash
# View logs
docker-compose logs -f catalog-service

# Enter container shell
docker-compose exec catalog-service sh

# Check health of all services
for port in 3001 3002 3003 3004; do
  echo "Port $port:"
  curl http://localhost:$port/health
done

# Test database connection
mysql -u paradise_user -p paradise_plants -e "SELECT COUNT(*) FROM plants;"
```

---

## 📋 Environment Variables Reference

### Backend (.env & .env.docker)

```
# Database
DB_HOST=localhost              # Database host
DB_PORT=3306                   # Database port
DB_USER=root                   # Database user
DB_PASSWORD=paradise123        # Database password
DB_NAME=paradise_plants        # Database name

# Microservices Ports
CATALOG_PORT=3001             # Catalog service port
INVENTORY_PORT=3002           # Inventory service port
ORDERS_PORT=3003              # Orders service port
CARE_REMINDERS_PORT=3004      # Care Reminders port

# Service URLs (for inter-service communication)
CATALOG_URL=http://localhost:3001
INVENTORY_URL=http://localhost:3002
ORDERS_URL=http://localhost:3003
CARE_REMINDERS_URL=http://localhost:3004

# Environment
NODE_ENV=development           # development or production
```

### Frontend (.env.local)

```
# API URLs
VITE_CATALOG_API=http://localhost:3001
VITE_INVENTORY_API=http://localhost:3002
VITE_ORDERS_API=http://localhost:3003
VITE_CARE_REMINDERS_API=http://localhost:3004

# Optional: Analytics, monitoring, etc.
```

---

## 🤝 Contributing

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/paradise-plants.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Test your changes

4. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Describe your changes
   - Reference any related issues

### Code Style Guidelines

- **JavaScript/TypeScript**: Use ESLint configuration
- **React**: Functional components with hooks
- **SQL**: Use proper indentation and comments
- **Git Commits**: Use conventional commits format

### Adding New Features

#### **Add a New Microservice**

1. Create service directory: `backend/services/your-service/`
2. Create `index.js` with Express app
3. Add routes and database queries
4. Update `backend/index.js` to start service
5. Update `docker-compose.yml`
6. Document API endpoints

#### **Update Frontend Pages**

1. Create page component in `src/pages/`
2. Use existing hooks: `useCatalog()`, `useOrders()`, etc.
3. Add styling with Tailwind CSS
4. Add routing in `src/App.tsx`
5. Update Navigation links

---

## 📚 Additional Resources

### Documentation
- [API Documentation](./backend/docs/API.md)
- [OpenAPI Specification](./backend/docs/openapi.json)
- [Postman Collection](./backend/docs/paradise-plants-api.postman_collection.json)

### Related Technologies
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MySQL Documentation](https://dev.mysql.com/doc)
- [Docker Documentation](https://docs.docker.com)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

### Learning Resources
- [Microservices Architecture](https://microservices.io)
- [RESTful API Design](https://restfulapi.net)
- [React Hooks](https://react.dev/reference/react/hooks)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

```
MIT License

Copyright (c) 2026 Paradise Plants

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 📞 Support

### Getting Help

1. **Check Documentation**
   - Review [API Documentation](./backend/docs/API.md)
   - See [Troubleshooting](#troubleshooting) section

2. **Check GitHub Issues**
   - Search for similar issues
   - Create a new issue with details

3. **Contact Support**
   - Email: support@paradise-plants.com
   - Discord: [Join our community](https://discord.com)

---

## 🎯 Roadmap

### Planned Features (v1.1)

- [ ] User authentication & roles
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Advanced analytics & reporting
- [ ] Mobile app (React Native)
- [ ] Wishlist & favorites
- [ ] Reviews & ratings
- [ ] Real-time chat support

### Known Limitations

- Single database instance (no replication)
- No authentication/authorization yet
- Limited to MySQL database
- Horizontal scaling requires additional setup

---

## ✅ Checklist for First-Time Users

- [ ] Clone the repository
- [ ] Install Node.js & Docker
- [ ] Read this README
- [ ] Run backend: `docker-compose up`
- [ ] Run frontend: `npm run dev`
- [ ] Access http://localhost:5173
- [ ] Test API with Postman collection
- [ ] Explore the code structure
- [ ] Try creating orders & reminders
- [ ] Check out the API documentation

---

## 🎉 You're All Set!

You now have a complete understanding of the Paradise Plants platform. Start exploring, building, and deploying!

**Questions?** Check the [Troubleshooting](#troubleshooting) section or create an issue.

**Happy coding! 🌿**

---

<div align="center">

Made with ❤️ for plant lovers everywhere

[⬆ Back to top](#-paradise-plants---complete-plant-e-commerce-platform)

</div>
