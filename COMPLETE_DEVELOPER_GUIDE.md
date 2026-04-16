# 🌿 Paradise Plants - Complete Developer Guide

## Overview

Paradise Plants is a full-stack e-commerce platform for plant sales and care management. This guide explains the codebase architecture, technologies used, and how all components work together.

## 🏗️ Architecture Overview

### Microservices Architecture

The backend consists of 4 independent Node.js microservices:

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Catalog       │
│   (React)       │◄──►│   Service       │
│                 │    │   (Port 3001)   │
└─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   Inventory     │    │   Orders        │
│   Service       │    │   Service       │
│   (Port 3002)   │    │   (Port 3003)   │
└─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   Care          │    │   MySQL         │
│   Reminders     │    │   Database      │
│   (Port 3004)   │    │   (Port 3306)   │
└─────────────────┘    └─────────────────┘
```

### Service Responsibilities

| Service | Purpose | Key Features |
|---------|---------|--------------|
| **Catalog** | Plant product management | CRUD operations, search, categories |
| **Inventory** | Stock tracking | Real-time stock levels, alerts |
| **Orders** | Order processing | Order lifecycle, status updates |
| **Care Reminders** | Plant care scheduling | Automated reminders, care instructions |

## 💻 Technology Stack

### Frontend (React + TypeScript)

**Framework:** React 18 with TypeScript
**Build Tool:** Vite
**Styling:** Tailwind CSS + Shadcn/ui components
**State Management:** React Query for API state
**Routing:** React Router
**Testing:** Vitest + Playwright

**Key Files:**
- `src/App.tsx` - Main app component
- `src/main.tsx` - App entry point
- `src/api/client.ts` - API client configuration
- `src/pages/` - Page components
- `src/components/` - Reusable UI components

### Backend (Node.js + Express)

**Runtime:** Node.js 18+
**Framework:** Express.js
**Database:** MySQL 8
**ORM:** Direct SQL queries (no ORM)
**Validation:** Custom validation middleware
**CORS:** Enabled for frontend communication

**Key Files:**
- `backend/index.js` - Main server file
- `backend/services/` - Individual microservices
- `backend/shared/` - Common database and validation code

### Database (MySQL)

**Schema:** 4 main tables
- `plants` - Plant catalog
- `inventory` - Stock levels
- `orders` - Customer orders
- `care_reminders` - Scheduled care tasks

**Connection:** Shared connection pool in `backend/shared/database/connection.js`

## 🔗 Service Communication

### API Endpoints

All services expose REST APIs:

**Catalog Service (Port 3001):**
- `GET /plants` - List all plants
- `GET /plants/:id` - Get plant details
- `POST /plants` - Create plant
- `PUT /plants/:id` - Update plant
- `DELETE /plants/:id` - Delete plant

**Inventory Service (Port 3002):**
- `GET /inventory` - Get all stock levels
- `GET /inventory/:plantId` - Get specific plant stock
- `PUT /inventory/:plantId` - Update stock level

**Orders Service (Port 3003):**
- `GET /orders` - List orders
- `POST /orders` - Create order
- `PUT /orders/:id/status` - Update order status

**Care Reminders Service (Port 3004):**
- `GET /reminders` - List reminders
- `POST /reminders` - Create reminder
- `PUT /reminders/:id` - Update reminder

### Inter-Service Communication

Services communicate through:
1. **Direct HTTP calls** between services
2. **Shared database** for data consistency
3. **Frontend API client** for user interactions

## 🐳 Containerization

### Docker Setup

**Frontend Container:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 80
CMD ["npm", "run", "preview"]
```

**Backend Container:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000-3004
CMD ["npm", "start"]
```

**Database Container:**
```yaml
mysql:
  image: mysql:8
  environment:
    MYSQL_ROOT_PASSWORD: root
    MYSQL_DATABASE: paradise_plants
  ports:
    - "3306:3306"
```

## 🚀 Development Workflow

### Local Development

1. **Start Database:**
   ```bash
   docker-compose up mysql -d
   ```

2. **Start Backend Services:**
   ```bash
   cd backend
   npm install
   npm run dev  # Starts all 4 services
   ```

3. **Start Frontend:**
   ```bash
   npm install
   npm run dev
   ```

4. **Access Application:**
   - Frontend: http://localhost:5173
   - API Health: http://localhost:3001/health

### Code Organization

**Frontend Structure:**
```
src/
├── api/           # API client and hooks
├── components/    # Reusable UI components
├── pages/         # Page-level components
├── lib/           # Utilities and helpers
└── data/          # Mock data for development
```

**Backend Structure:**
```
backend/
├── services/      # Individual microservices
│   ├── catalog-service/
│   ├── inventory-service/
│   ├── orders-service/
│   └── care-reminders-service/
├── shared/        # Common code
│   ├── database/
│   └── validation.js
└── index.js       # Service orchestrator
```

## 🔄 Data Flow

### User Journey Example

1. **Browse Plants:**
   - Frontend calls `GET /plants` (Catalog Service)
   - Service queries `plants` table
   - Returns plant list with inventory status

2. **Place Order:**
   - Frontend calls `POST /orders` (Orders Service)
   - Orders Service validates inventory via Inventory Service
   - Updates inventory levels
   - Creates order record

3. **Care Reminders:**
   - Background process checks due reminders
   - Sends notifications to users
   - Updates reminder status

## 🧪 Testing Strategy

### Frontend Testing
- **Unit Tests:** Vitest for component logic
- **E2E Tests:** Playwright for user flows
- **API Integration:** React Query mocking

### Backend Testing
- **Unit Tests:** Jest for service logic
- **Integration Tests:** API endpoint testing
- **Database Tests:** MySQL test database

## 📊 Monitoring & Observability

### Application Metrics
- Service health endpoints (`/health`)
- Request/response logging
- Error tracking and reporting

### Infrastructure Monitoring
- Prometheus for metrics collection
- Grafana for visualization
- Azure Monitor for cloud resources

## 🔒 Security Considerations

### API Security
- Input validation on all endpoints
- CORS configuration
- SQL injection prevention
- Rate limiting (future enhancement)

### Container Security
- Non-root user execution
- Minimal base images
- Regular security scanning with Trivy

## 🚀 Deployment Architecture

### Local Deployment
- Docker Compose for all services
- Local MySQL database
- Volume mounts for development

### Cloud Deployment (AKS)
- Azure Container Registry for images
- Azure Kubernetes Service for orchestration
- ArgoCD for GitOps deployment
- Helm charts for configuration management

## 📈 Scaling Considerations

### Horizontal Scaling
- Stateless services can be scaled horizontally
- Database connection pooling
- Load balancer for frontend

### Database Scaling
- Read replicas for read-heavy operations
- Connection pooling optimization
- Query optimization and indexing

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Clone your fork
3. Follow the local development setup
4. Create a feature branch
5. Make your changes
6. Run tests and linting
7. Submit a pull request

### Code Standards
- ESLint configuration for JavaScript/TypeScript
- Prettier for code formatting
- Conventional commit messages
- Comprehensive test coverage

## 📚 Additional Resources

- [API Documentation](backend/docs/API.md)
- [Postman Collection](backend/docs/paradise-plants-api.postman_collection.json)
- [OpenAPI Specification](backend/docs/openapi.json)
- [Tools Installation](README_TOOLS.md)
- [DevOps Guide](README.md#devops--deployment)

---

**Ready to contribute?** Check out the [Contributing](#contributing) section above!

Made with ❤️ for plant lovers