# 🏗️ Architecture Documentation - Paradise Plants

## Project Overview

**Paradise Plants** is a full-stack microservices-based e-commerce platform for managing and selling plants.

- **Frontend**: React + TypeScript + Vite + Shadcn UI
- **Backend**: Node.js/Express Microservices
- **Database**: MySQL
- **Containerization**: Docker
- **Orchestration**: Kubernetes (EKS)
- **Monitoring**: Prometheus + Grafana
- **Logging**: OpenSearch

---

## 📁 Complete Folder Structure

```
Plants_of_paradise/
├── frontend/                              # React Frontend Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ErrorBoundary.tsx         # Error handling component
│   │   │   ├── Layout.tsx                # Main layout wrapper
│   │   │   ├── NavLink.tsx               # Navigation links
│   │   │   ├── PlantCard.tsx             # Plant card component
│   │   │   ├── StatCard.tsx              # Statistics card
│   │   │   └── ui/                       # Shadcn UI component library
│   │   ├── pages/
│   │   │   ├── Index.tsx                 # Home page
│   │   │   ├── Catalog.tsx               # Plant catalog
│   │   │   ├── Inventory.tsx             # Inventory management
│   │   │   ├── Orders.tsx                # Order management
│   │   │   ├── CareReminders.tsx         # Care reminders
│   │   │   └── NotFound.tsx              # 404 page
│   │   ├── api/
│   │   │   ├── client.ts                 # Axios HTTP client
│   │   │   ├── utils.ts                  # API utilities
│   │   │   └── hooks/
│   │   │       └── useApi.ts             # Custom hook for API calls
│   │   ├── hooks/
│   │   │   ├── use-mobile.tsx            # Mobile detection hook
│   │   │   └── use-toast.ts              # Toast notification hook
│   │   ├── lib/
│   │   │   └── utils.ts                  # Utility functions
│   │   ├── data/
│   │   │   └── mock.ts                   # Mock data for testing
│   │   ├── App.tsx                       # Main app component
│   │   ├── main.tsx                      # React entry point
│   │   ├── index.css                     # Global styles
│   │   └── App.css                       # App styles
│   ├── public/                           # Static assets
│   ├── vite.config.ts                    # Vite configuration
│   ├── index.html                        # HTML template
│   ├── tailwind.config.ts                # Tailwind CSS config
│   ├── tsconfig.app.json                 # TypeScript config
│   ├── postcss.config.js                 # PostCSS config
│   └── vitest.config.ts                  # Vitest config
│
├── backend/                               # Node.js Backend Services
│   ├── services/
│   │   ├── catalog-service/
│   │   │   └── index.js                  # Catalog microservice
│   │   ├── inventory-service/
│   │   │   └── index.js                  # Inventory microservice
│   │   ├── orders-service/
│   │   │   └── index.js                  # Order management service
│   │   └── care-reminders-service/
│   │       └── index.js                  # Care reminders service
│   ├── shared/
│   │   ├── validation.js                 # Shared validation logic
│   │   └── database/
│   │       ├── connection.js             # MySQL connection
│   │       ├── schema.sql                # Database schema
│   │       └── seed.sql                  # Sample data
│   ├── docs/
│   │   ├── API.md                        # API documentation
│   │   ├── openapi.json                  # OpenAPI specification
│   │   └── paradise-plants-api.postman_collection.json
│   ├── index.js                          # Backend entry point
│   └── package.json                      # Backend dependencies
│
├── config/                               # Configuration Files
│   ├── package.json                      # Root dependencies
│   └── tsconfig.json                     # Root TypeScript config
│
├── dependencies/                         # Lock files (not needed in container)
│   ├── bun.lock
│   ├── bun.lockb
│   └── package-lock.json
│
├── docker/                               # Docker configuration
│   ├── Dockerfile.frontend               # Frontend build
│   ├── Dockerfile.backend                # Backend build
│   └── docker-compose.yml                # Local development
│
├── k8s/                                  # Kubernetes manifests
│   ├── namespace.yaml
│   ├── frontend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── ingress.yaml
│   ├── backend/
│   │   ├── catalog-service.yaml
│   │   ├── inventory-service.yaml
│   │   ├── orders-service.yaml
│   │   └── care-reminders-service.yaml
│   ├── database/
│   │   ├── configmap.yaml
│   │   ├── secret.yaml
│   │   └── statefulset.yaml
│   └── monitoring/
│       ├── prometheus-config.yaml
│       ├── prometheus-deployment.yaml
│       └── grafana-deployment.yaml
│
├── terraform/                            # IaC for AWS Infrastructure
│   ├── main.tf                           # Main terraform config
│   ├── vpc.tf                            # VPC and networking
│   ├── iam.tf                            # IAM roles and policies
│   ├── s3.tf                             # S3 buckets
│   ├── ecr.tf                            # Elastic Container Registry
│   ├── eks.tf                            # Elastic Kubernetes Service
│   ├── rds.tf                            # RDS (optional for database)
│   ├── cloudwatch.tf                     # CloudWatch logging
│   ├── cloudtrail.tf                     # CloudTrail audit logs
│   ├── variables.tf                      # Input variables
│   ├── outputs.tf                        # Output values
│   └── terraform.tfvars                  # Variable values
│
├── helm/                                 # Helm Charts
│   ├── paradise-plants/
│   │   ├── Chart.yaml
│   │   ├── values.yaml
│   │   └── templates/
│   │       ├── frontend.yaml
│   │       ├── backend.yaml
│   │       ├── database.yaml
│   │       └── monitoring.yaml
│
├── cicd/                                 # CI/CD Pipeline
│   ├── jenkins/
│   │   ├── Jenkinsfile                   # Jenkins pipeline
│   │   └── jenkinsfile-scripts/
│   └── aws-codepipeline/
│       └── buildspec.yml                 # AWS CodeBuild spec
│
├── monitoring/                           # Monitoring & Logging
│   ├── prometheus/
│   │   └── prometheus.yml
│   ├── grafana/
│   │   └── dashboards/
│   └── opensearch/
│       └── opensearch-config.yml
│
├── docs/                                 # Documentation
│   ├── 1-ARCHITECTURE.md                 # This file
│   ├── 2-DEVOPS_WORKFLOW.md              # DevOps workflow
│   └── 3-INSTALLATION_GUIDE.md           # Installation guide
│
└── .github/                              # GitHub Actions
    └── workflows/
        ├── build.yml
        └── deploy.yml
```

---

## 🔄 How Components Communicate

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          CLIENT BROWSER                         │
└──────────────────────────────┬──────────────────────────────────┘
                               │ HTTP/HTTPS
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (React + Vite)                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Pages: Catalog, Inventory, Orders, Care Reminders     │   │
│  │  Components: PlantCard, StatCard, Layout               │   │
│  │  State: React Query for server state                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                         ▲                                       │
│                         │                                       │
│                    REST API Calls                               │
│                    (Axios HttpClient)                           │
│                         │                                       │
└─────────────────────────┼───────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │ REST API (Express)
          ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │ Catalog  │    │Inventory │    │  Orders  │
    │ Service  │    │ Service  │    │ Service  │
    │ (Port    │    │ (Port    │    │ (Port    │
    │  3001)   │    │  3002)   │    │  3003)   │
    └────┬─────┘    └────┬─────┘    └────┬─────┘
         │                │               │
         │          ┌──────────────┐     │
         │          │    Care      │     │
         └─────────▶│  Reminders   │◀────┘
                    │   Service    │
                    │  (Port 3004) │
                    └──────┬───────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
    ┌──────────────────────────────────────────┐
    │            MySQL Database                │
    │  - plants table                          │
    │  - inventory table                       │
    │  - orders table                          │
    │  - reminders table                       │
    │  (Default: localStorage for demo)        │
    └──────────────────────────────────────────┘
```

---

## 🌐 Service Communication Flow

### 1. **Frontend → Backend Services**
- Frontend makes REST API calls to backend services
- Each service listens on its own port (3001-3004)
- Uses Axios with custom hooks (`useApi`)
- Requests include:
  - GET: Fetch data
  - POST: Create records
  - PUT: Update records
  - DELETE: Remove records

### 2. **Service-to-Service Communication**
- Services can call each other directly
- Care Reminders service talks to Inventory & Catalog services
- Uses internal HTTP calls with `axios`

### 3. **Database Layer**
- All services connect to MySQL database
- Shared connection pool in `shared/database/connection.js`
- Shared validation in `shared/validation.js`

### 4. **Environment Variables**
Each service reads configuration from `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=paradise_plants
PORT=3001-3004 (varies per service)
```

---

## 🛠️ Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend UI Framework** | React | 18.x |
| **Frontend Build Tool** | Vite | Latest |
| **Frontend Styling** | Tailwind CSS | Latest |
| **Frontend UI Components** | Shadcn UI | Latest |
| **Backend Runtime** | Node.js | 18+ |
| **Backend Framework** | Express.js | 4.18.x |
| **HTTP Client** | Axios | 1.6.x |
| **Database** | MySQL | 8.0+ |
| **Database Driver** | mysql2 | 3.6.x |
| **Containerization** | Docker | Latest |
| **Orchestration** | Kubernetes (EKS) | 1.24+ |
| **Infrastructure as Code** | Terraform | 1.0+ |
| **Package Manager** | npm/Bun | Latest |
| **Testing (Frontend)** | Vitest | Latest |
| **Linting** | ESLint | Latest |

---

## 📊 Data Flow Examples

### Example 1: View Plant Catalog
```
1. User opens Frontend → Catalog Page
2. Component mounts → useApi hook triggers GET /api/catalog
3. Frontend sends → http://catalog-service:3001/api/plants
4. Catalog Service → Queries MySQL "SELECT * FROM plants"
5. Returns → JSON array of plants
6. Frontend → Renders PlantCard components
```

### Example 2: Place an Order
```
1. User fills order form → Submits
2. Frontend sends → POST /api/orders with order data
3. Orders Service (3003) → Validates order
4. Orders Service → Calls Inventory Service (3002)
   - Updates stock: PUT /api/inventory/:plantId
5. Inventory Service → Updates MySQL inventory table
6. Orders Service → Inserts order into MySQL
7. Frontend → Shows success message
```

### Example 3: Set Care Reminder
```
1. User selects plant → Sets reminder
2. Frontend sends → POST /api/reminders
3. Care Reminders Service (3004) → Validates
4. Calls Catalog Service (3001) → Verifies plant exists
5. Stores reminder in MySQL
6. Frontend → Shows confirmation
```

---

## 🔐 Security Architecture

- **CORS Enabled**: Frontend and backend on different ports
- **Environment Variables**: Sensitive data in .env files
- **Database Validation**: Shared validation.js prevents SQL injection
- **Frontend Error Boundary**: Catches and handles errors gracefully

---

## 📈 Scalability Considerations

1. **Microservices**: Each service can be scaled independently
2. **Database**: Can be separated from application servers
3. **Kubernetes**: Enables horizontal pod autoscaling
4. **Load Balancing**: AWS ELB/NLB will distribute traffic
5. **Caching**: Can implement Redis for frequently accessed data
6. **Message Queues**: Consider RabbitMQ/SQS for async operations

---

## Next Steps

1. Review **Dockerfile** for containerization
2. Check **2-DEVOPS_WORKFLOW.md** for deployment architecture
3. See **3-INSTALLATION_GUIDE.md** for setup instructions
