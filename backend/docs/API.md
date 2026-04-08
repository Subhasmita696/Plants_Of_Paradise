# 📚 API Documentation - Paradise Plants

Complete API documentation for the Paradise Plants microservices backend.

## 📡 API Overview

The Paradise Plants API consists of 4 independent microservices:

| Service | Port | Purpose |
|---------|------|---------|
| 🌿 Catalog Service | 3001 | Product catalog management |
| 📦 Inventory Service | 3002 | Stock and inventory tracking |
| 📋 Orders Service | 3003 | Order processing and management |
| 🌱 Care Reminders | 3004 | Plant care scheduling |

## 🔗 Base URLs

**Development (Local):**
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

## 🌿 Catalog Service API

### Get All Plants
```http
GET /api/plants
```
**Response:**
```json
[
  {
    "id": 1,
    "name": "Monstera Deliciosa",
    "scientific_name": "Monstera deliciosa",
    "description": "Large tropical plant with stunning holes in leaves",
    "price": 45.99,
    "category": "Tropical",
    "light_requirements": "Bright Indirect",
    "water_frequency": "Weekly",
    "humidity_level": "High",
    "image_url": "https://..."
  }
]
```

### Get Plant by ID
```http
GET /api/plants/:id
```
**Example:** `GET /api/plants/1`

### Get Plants by Category
```http
GET /api/plants/category/:category
```
**Example:** `GET /api/plants/category/Tropical`

**Categories:**
- Tropical
- Indoor
- Succulent
- Flowering

### Create Plant
```http
POST /api/plants
Content-Type: application/json

{
  "name": "New Plant",
  "scientific_name": "Plant scientificus",
  "description": "A beautiful new plant",
  "price": 29.99,
  "category": "Tropical",
  "light_requirements": "Bright Indirect",
  "water_frequency": "Weekly",
  "humidity_level": "High",
  "image_url": "https://example.com/image.jpg"
}
```

### Health Check
```http
GET /health
```

---

## 📦 Inventory Service API

### Get All Inventory
```http
GET /api/inventory
```

### Get Inventory by Plant ID
```http
GET /api/inventory/:plantId
```

**Response:**
```json
{
  "id": 1,
  "plant_id": 1,
  "name": "Monstera Deliciosa",
  "quantity_in_stock": 15,
  "reorder_level": 10,
  "supplier": "Tropical Nursery Co",
  "storage_location": "Shelf A1"
}
```

### Get Low Stock Items
```http
GET /api/inventory/low-stock
```
Returns items where `quantity_in_stock <= reorder_level`

### Update Inventory Quantity
```http
PATCH /api/inventory/:plantId
Content-Type: application/json

{
  "quantity_in_stock": 50
}
```

### Health Check
```http
GET /health
```

---

## 📋 Orders Service API

### Get All Orders
```http
GET /api/orders
```

### Get Order by ID (with items)
```http
GET /api/orders/:id
```

**Response:**
```json
{
  "id": 1,
  "order_number": "ORD-001",
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "555-0101",
  "total_amount": 89.97,
  "status": "delivered",
  "shipping_address": "123 Main St, Anytown, USA",
  "items": [
    {
      "id": 1,
      "order_id": 1,
      "plant_id": 2,
      "name": "Pothos",
      "quantity": 1,
      "unit_price": 12.99,
      "subtotal": 12.99
    }
  ]
}
```

### Create Order
```http
POST /api/orders
Content-Type: application/json

{
  "customer_name": "Jane Doe",
  "customer_email": "jane@example.com",
  "customer_phone": "555-0102",
  "shipping_address": "456 Oak Ave, Springfield, USA",
  "items": [
    {
      "plant_id": 1,
      "quantity": 2,
      "unit_price": 45.99
    },
    {
      "plant_id": 3,
      "quantity": 1,
      "unit_price": 19.99
    }
  ]
}
```

**Response:**
```json
{
  "id": 4,
  "order_number": "ORD-1712606400000",
  "total_amount": 111.97
}
```

### Update Order Status
```http
PATCH /api/orders/:id/status
Content-Type: application/json

{
  "status": "shipped"
}
```

**Valid Statuses:**
- `pending` - Initial state
- `confirmed` - Order confirmed
- `shipped` - Order shipped
- `delivered` - Order delivered
- `cancelled` - Order cancelled

### Health Check
```http
GET /health
```

---

## 🌱 Care Reminders Service API

### Get All Reminders
```http
GET /api/care-reminders
```

### Get Plant Reminders
```http
GET /api/care-reminders/plant/:plantId
```

### Get Upcoming Reminders (Due within 7 days)
```http
GET /api/care-reminders/upcoming
```

**Response:**
```json
[
  {
    "id": 1,
    "plant_id": 1,
    "name": "Monstera Deliciosa",
    "reminder_type": "watering",
    "frequency": "Weekly",
    "last_performed": "2026-04-01",
    "next_due_date": "2026-04-08",
    "description": "Water when top inch of soil is dry",
    "is_active": true
  }
]
```

### Create Reminder
```http
POST /api/care-reminders
Content-Type: application/json

{
  "plant_id": 1,
  "reminder_type": "watering",
  "frequency": "Weekly",
  "next_due_date": "2026-04-15",
  "description": "Water when top inch of soil is dry"
}
```

**Reminder Types:**
- `watering` - Watering schedule
- `fertilizing` - Fertilizer application
- `pruning` - Pruning maintenance
- `repotting` - Repotting schedule
- `inspection` - Plant inspection

### Mark Reminder as Completed
```http
PATCH /api/care-reminders/:id/complete
```

**Response:**
```json
{
  "success": true,
  "id": 1,
  "last_performed": "2026-04-08",
  "next_due_date": "2026-04-15"
}
```

### Health Check
```http
GET /health
```

---

## 🧪 Testing APIs

### Using Postman

1. **Import Collection:**
   - Open Postman
   - Click "Import" 
   - Select `backend/docs/paradise-plants-api.postman_collection.json`
   - Update environment variables for your URLs

2. **Environment Variables:**
   - `CATALOG_URL` - http://localhost:3001
   - `INVENTORY_URL` - http://localhost:3002
   - `ORDERS_URL` - http://localhost:3003
   - `CARE_REMINDERS_URL` - http://localhost:3004

### Using cURL

**Get all plants:**
```bash
curl http://localhost:3001/api/plants
```

**Create order:**
```bash
curl -X POST http://localhost:3003/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Test User",
    "customer_email": "test@example.com",
    "items": [{"plant_id": 1, "quantity": 1, "unit_price": 45.99}]
  }'
```

### Health Checks
```bash
curl http://localhost:3001/health  # Catalog
curl http://localhost:3002/health  # Inventory
curl http://localhost:3003/health  # Orders
curl http://localhost:3004/health  # Care Reminders
```

---

## 📊 Frontend Integration

### Using the API Client

```typescript
import { useCatalog, useOrders } from '@/api/hooks/useApi';

function App() {
  const { plants, loading, fetchAllPlants } = useCatalog();
  const { orders, createOrder } = useOrders();

  useEffect(() => {
    fetchAllPlants();
  }, []);

  return (
    <div>
      {loading ? 'Loading...' : plants.map(p => <div>{p.name}</div>)}
    </div>
  );
}
```

### Raw Fetch Example

```typescript
const response = await fetch('http://localhost:3001/api/plants');
const plants = await response.json();
```

---

## ⚠️ Error Handling

All endpoints return appropriate HTTP status codes:

| Status | Meaning |
|--------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Server Error |

**Error Response:**
```json
{
  "error": "Failed to fetch plants"
}
```

---

## 🔒 CORS Configuration

All services have CORS enabled for development. Update in production!

---

## 📖 OpenAPI/Swagger

Full OpenAPI 3.0 specification is available at:
`backend/docs/openapi.json`

---

## 🚀 Deployment

### Environment-Specific URLs

**Development:**
```
http://localhost:3001
http://localhost:3002
http://localhost:3003
http://localhost:3004
```

**Production (Example):**
```
https://api.paradise-plants.com/catalog
https://api.paradise-plants.com/inventory
https://api.paradise-plants.com/orders
https://api.paradise-plants.com/care
```

Update `.env` file accordingly for your deployment.
