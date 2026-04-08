# 🌿 Paradise Plants - Plant E-Commerce Platform

A modern, full-stack microservices-based e-commerce platform for managing and selling plants. Built with React, Node.js, MySQL, and Docker.

**📚 [READ THE COMPLETE GUIDE →](COMPLETE_GUIDE.md)**

---

## ⚡ Quick Start

### 🐳 Fastest Way (Docker)

```bash
# Start all services
docker-compose up -d

# Wait 30 seconds for services to health-check
docker-compose ps

# Access the app
echo "Frontend:  http://localhost:5173"
echo "API Docs:  http://localhost:3001/health"
```

### 💻 Local Development

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (new terminal)
npm install && npm run dev
```

---

## 🎯 What's Included

| Feature | Status |
|---------|--------|
| 🌿 Plant Catalog | ✅ Complete |
| 📦 Inventory Management | ✅ Complete |
| 📋 Order Management | ✅ Complete |
| 🌱 Care Reminders | ✅ Complete |
| 🎨 Responsive UI | ✅ Complete |
| 📡 REST API | ✅ Complete |
| 🔄 Microservices | ✅ Complete |
| 🐳 Docker Setup | ✅ Complete |
| 📊 Sample Data | ✅ Complete |

---

## 🏗️ Architecture

```
Frontend (React)
    ↓ HTTP/REST
├─ Catalog Service (Node.js)    [Port 3001]
├─ Inventory Service (Node.js)  [Port 3002]
├─ Orders Service (Node.js)     [Port 3003]
└─ Care Reminders (Node.js)     [Port 3004]
    ↓ SQL
MySQL Database [Port 3306]
```

---

## 🚀 Services

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | User Interface |
| Catalog | http://localhost:3001 | Plant Products |
| Inventory | http://localhost:3002 | Stock Management |
| Orders | http://localhost:3003 | Order Processing |
| Care | http://localhost:3004 | Care Scheduling |

---

## 📖 Documentation

- **[Complete Guide](COMPLETE_GUIDE.md)** - Full documentation with setup, usage, and deployment
- **[API Documentation](backend/docs/API.md)** - All endpoints documented
- **[Postman Collection](backend/docs/paradise-plants-api.postman_collection.json)** - Import to test APIs
- **[OpenAPI Spec](backend/docs/openapi.json)** - OpenAPI 3.0 specification

---

## 🛠️ Tech Stack

**Frontend:** React 18 • TypeScript • Vite • Tailwind CSS • Shadcn/ui • Framer Motion

**Backend:** Node.js • Express • MySQL 8 • Docker • REST API

**DevTools:** ESLint • Vitest • Playwright

---

## 📁 Project Structure

```
paradise-plants/
├── frontend/                  # React application
│   ├── src/api/             # API client & hooks
│   ├── src/pages/           # Page components
│   ├── src/components/      # UI components
│   └── src/data/            # Mock data
│
├── backend/                 # Node.js microservices
│   ├── services/            # 4 microservices
│   ├── shared/database/     # Database config
│   └── docs/                # API documentation
│
├── docker-compose.yml       # Complete setup
└── COMPLETE_GUIDE.md        # Full documentation
```

---

## 🔧 Available Commands

### Backend

```bash
cd backend

npm install         # Install dependencies
npm run dev        # Start all services (watch mode)
npm start          # Start in production
npm test           # Run tests
```

### Frontend

```bash
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Build for production
npm run lint       # Check code quality
npm run test       # Run tests
```

### Docker

```bash
docker-compose up -d      # Start all services
docker-compose down       # Stop all services
docker-compose logs -f    # View logs
docker-compose ps         # Check status
```

---

## 🌐 API Endpoints (Quick Reference)

<details>
<summary>Click to expand API endpoints</summary>

### Catalog Service (3001)
- `GET /api/plants` - All plants
- `GET /api/plants/:id` - Single plant
- `GET /api/plants/category/:category` - By category
- `POST /api/plants` - Create plant

### Inventory Service (3002)
- `GET /api/inventory` - All stock
- `GET /api/inventory/:plantId` - Plant stock
- `GET /api/inventory/low-stock` - Low stock items
- `PATCH /api/inventory/:plantId` - Update quantity

### Orders Service (3003)
- `GET /api/orders` - All orders
- `GET /api/orders/:id` - Order details
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id/status` - Update status

### Care Reminders (3004)
- `GET /api/care-reminders` - All reminders
- `GET /api/care-reminders/upcoming` - Next 7 days
- `POST /api/care-reminders` - Create reminder
- `PATCH /api/care-reminders/:id/complete` - Mark done

</details>

---

## 📊 Database

**Tables:**
- `plants` - Product catalog
- `inventory` - Stock levels
- `orders` - Customer orders
- `order_items` - Order line items
- `care_reminders` - Plant care schedule

**Pre-loaded with 10 Plants & 3 Sample Orders**

---

## ✨ Features

✅ Browse & search plants by name/category
✅ Real-time inventory tracking with alerts
✅ Complete order lifecycle management
✅ Plant care reminder scheduling
✅ Beautiful, responsive design
✅ Dark/Light mode support
✅ Microservices architecture
✅ Automatic request caching
✅ Error handling & validation
✅ Docker containerization

---

## 🚀 Deployment

### Docker Production

```bash
# Build & deploy
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d

# Update environment variables in .env.docker
# for production database and URLs
```

### Frontend (Vercel, Netlify, etc.)

```bash
npm run build
# Deploy dist/ folder
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | Kill process: `lsof -i :PORT` → `kill -9 PID` |
| DB connection error | Check MySQL running & credentials in `.env` |
| API returns 404 | Verify service is running: `curl http://localhost:3001/health` |
| CORS error | Update API URLs in `.env.local` |
| Docker fails | Run `docker-compose down -v && docker-compose up --build` |

**More help in [COMPLETE_GUIDE.md](COMPLETE_GUIDE.md#troubleshooting)**

---

## 📚 Learning Path

1. **Read the guide** - [COMPLETE_GUIDE.md](COMPLETE_GUIDE.md)
2. **Start services** - `docker-compose up -d`
3. **Explore UI** - http://localhost:5173
4. **Test APIs** - Import Postman collection
5. **Review code** - Check `/backend/services/`
6. **Deploy** - Follow deployment section

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

See [COMPLETE_GUIDE.md#contributing](COMPLETE_GUIDE.md#contributing) for details

---

## 📄 License

MIT License - see LICENSE file

---

## 📞 Need Help?

- 📖 **Full Guide:** [COMPLETE_GUIDE.md](COMPLETE_GUIDE.md)
- 🔌 **API Docs:** [backend/docs/API.md](backend/docs/API.md)
- 🧪 **Postman:** [backend/docs/paradise-plants-api.postman_collection.json](backend/docs/paradise-plants-api.postman_collection.json)
- ❓ **FAQ:** See [Troubleshooting](#troubleshooting) above

---

<div align="center">

**Ready to get started?** 
→ **[Read COMPLETE_GUIDE.md](COMPLETE_GUIDE.md)** ←

Made with ❤️ for plant lovers

</div>
