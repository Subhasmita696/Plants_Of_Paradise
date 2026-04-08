# Paradise Plants - Backend Microservices

Complete backend infrastructure for the Paradise Plants e-commerce application with microservices architecture.

## 📋 Project Structure

```
backend/
├── services/
│   ├── catalog-service/      # Product catalog management
│   ├── inventory-service/    # Stock/inventory management
│   ├── orders-service/       # Order processing
│   └── care-reminders-service/  # Plant care reminders
├── shared/
│   └── database/
│       ├── connection.js     # Database connection pool
│       ├── schema.sql        # Database schema
│       └── seed.sql          # Sample data
├── docker-compose.yml        # Docker orchestration
├── Dockerfile.service        # Service Docker image
├── .env                      # Local development config
└── .env.docker              # Docker environment config
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MySQL 8.0+ (or Docker)
- npm or bun package manager

### Local Development Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Setup MySQL Database**
   ```bash
   mysql -u root -p < shared/database/schema.sql
   mysql -u root -p paradise_plants < shared/database/seed.sql
   ```

3. **Configure Environment**
   Edit `.env` with your database credentials

4. **Start Services**
   ```bash
   npm run dev
   ```

### Docker Setup

1. **Build and Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

   This starts:
   - MySQL database (port 3306)
   - Catalog Service (port 3001)
   - Inventory Service (port 3002)
   - Orders Service (port 3003)
   - Care Reminders Service (port 3004)

2. **View Logs**
   ```bash
   docker-compose logs -f
   ```

3. **Stop Services**
   ```bash
   docker-compose down
   ```

## 📡 API Endpoints

### Catalog Service (Port 3001)
- `GET /api/plants` - List all plants
- `GET /api/plants/:id` - Get plant details
- `GET /api/plants/category/:category` - Filter by category
- `POST /api/plants` - Create new plant (admin)
- `GET /health` - Service health check

### Inventory Service (Port 3002)
- `GET /api/inventory` - List all inventory
- `GET /api/inventory/:plantId` - Get plant stock
- `GET /api/inventory/low-stock` - Get low stock alerts
- `PATCH /api/inventory/:plantId` - Update stock quantity
- `GET /health` - Service health check

### Orders Service (Port 3003)
- `GET /api/orders` - List all orders
- `GET /api/orders/:id` - Get order details with items
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status
- `GET /health` - Service health check

### Care Reminders Service (Port 3004)
- `GET /api/care-reminders` - List all reminders
- `GET /api/care-reminders/plant/:plantId` - Get plant reminders
- `GET /api/care-reminders/upcoming` - Get due reminders (7 days)
- `POST /api/care-reminders` - Create new reminder
- `PATCH /api/care-reminders/:id/complete` - Mark as completed
- `GET /health` - Service health check

## 📊 Database Schema

### Tables
- **plants** - Product catalog
- **inventory** - Stock levels
- **orders** - Customer orders
- **order_items** - Order line items
- **care_reminders** - Plant care schedule

## 🔐 Environment Variables

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=paradise123
DB_NAME=paradise_plants

CATALOG_PORT=3001
INVENTORY_PORT=3002
ORDERS_PORT=3003
CARE_REMINDERS_PORT=3004

NODE_ENV=development
```

## 🧪 Testing

Sample data is automatically seeded with 10 test plants and 3 sample orders. Use these for testing:

- **Cats:** Tropical, Indoor, Succulent, Flowering
- **Plants:** Monstera, Pothos, Snake Plant, Fiddle Leaf Fig, ZZ Plant, etc.
- **Orders:** ORD-001, ORD-002, ORD-003 (varying statuses)

## 🛠 Common Commands

```bash
# Install dependencies
npm install

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start

# View database
mysql -u root -p paradise_plants

# Test service health
curl http://localhost:3001/health
curl http://localhost:3002/health
curl http://localhost:3003/health
curl http://localhost:3004/health
```

## 🔗 Integration with Frontend

Your React frontend should use these base URLs:

```javascript
const API_BASE = {
  catalog: 'http://localhost:3001',
  inventory: 'http://localhost:3002',
  orders: 'http://localhost:3003',
  careReminders: 'http://localhost:3004'
};
```

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure MySQL is running: `mysql -u root -p -e "SELECT 1"`
- Check credentials in `.env`
- Verify port 3306 is open

### Port Already in Use
```bash
# Find process using the port
lsof -i :3001

# Kill the process
kill -9 <PID>
```

### Docker Issues
```bash
# Reset everything
docker-compose down -v
docker-compose up --build

# Check logs
docker-compose logs service-name
```

## 📝 License

MIT
