# 🐳 Docker Guide - Paradise Plants

Complete guide for building, running, and managing Docker containers for Paradise Plants application.

---

## 📁 Files Created

```
frontend/
├── Dockerfile           # Multi-stage build for React app with Nginx
├── nginx.conf          # Nginx configuration for SPA routing
└── .dockerignore       # Exclude files from Docker build

backend/
├── Dockerfile          # Node.js production image
└── .dockerignore       # Exclude files from Docker build

docker-compose.yml     # Local development orchestration (UPDATED)
```

---

## 🏗️ Dockerfile Architecture

### Frontend Dockerfile (Multi-Stage Build)

**Stage 1: Builder**
- Uses Node.js 18 Alpine (lightweight)
- Installs dependencies
- Builds React app with Vite
- Output: `/app/dist` folder

**Stage 2: Production**
- Uses Nginx Alpine (lightweight, 5MB)
- Copies built assets
- Serves with optimized Nginx
- Size: ~20MB (vs 400MB with Node.js)

**Benefits:**
- ✅ Smaller image size
- ✅ Faster deployment
- ✅ SPA routing support
- ✅ Gzip compression
- ✅ Security headers
- ✅ Health checks
- ✅ Caching optimization

### Backend Dockerfile

- Uses Node.js 18 Alpine
- Non-root user for security
- Graceful signal handling with dumb-init
- Health checks included
- Supports all 4 microservices ports
- Environment-aware configuration

---

## 🚀 Quick Start

### 1️⃣ Using docker-compose (Easiest)

**Start all services:**
```bash
# Navigate to project root
cd /Users/subhasmitadas/Desktop/Plants_of_paradise

# Build and start all services
docker-compose up -d

# Wait for services to be ready (20-30 seconds)
sleep 30

# Check status
docker-compose ps
```

**Access the application:**
```bash
# Frontend: http://localhost:5173
# API Catalog: http://localhost:3001
# API Inventory: http://localhost:3002
# API Orders: http://localhost:3003
# API Reminders: http://localhost:3004
# Database UI: http://localhost:8080 (PhpMyAdmin)
```

**View logs:**
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

**Stop all services:**
```bash
docker-compose down

# Stop and remove volumes (caution: deletes data)
docker-compose down -v
```

---

### 2️⃣ Building Individual Images

**Build Frontend:**
```bash
cd frontend
docker build -t paradise-plants/frontend:latest .

# Verify
docker images | grep paradise-plants/frontend
```

**Build Backend:**
```bash
cd backend
docker build -t paradise-plants/backend:latest .

# Verify
docker images | grep paradise-plants/backend
```

**Build All:**
```bash
cd /Users/subhasmitadas/Desktop/Plants_of_paradise

docker build -t paradise-plants/frontend:latest ./frontend/
docker build -t paradise-plants/backend:latest ./backend/
```

---

### 3️⃣ Running Containers Individually

**Run MySQL:**
```bash
docker run -d \
  --name paradise-mysql \
  -e MYSQL_ROOT_PASSWORD=paradise123 \
  -e MYSQL_DATABASE=paradise_plants \
  -p 3306:3306 \
  mysql:8.0
```

**Run Backend:**
```bash
docker run -d \
  --name paradise-backend \
  --link paradise-mysql:mysql \
  -e DB_HOST=mysql \
  -e DB_USER=paradise_user \
  -e DB_PASSWORD=paradise123 \
  -e DB_NAME=paradise_plants \
  -p 3001-3004:3001-3004 \
  paradise-plants/backend:latest
```

**Run Frontend:**
```bash
docker run -d \
  --name paradise-frontend \
  --link paradise-backend:backend \
  -p 5173:80 \
  paradise-plants/frontend:latest
```

---

## 🔧 Docker Compose Services

### Service Overview

| Service | Port | Status | Purpose |
|---------|------|--------|---------|
| **mysql** | 3306 | Running | Database |
| **backend** | 3001-3004 | Running | Node.js APIs |
| **frontend** | 5173 (→80) | Running | React Web App |
| **phpmyadmin** | 8080 | Running | Database UI |

### Environment Variables

Located in `docker-compose.yml`:

**Database:**
```yaml
MYSQL_ROOT_PASSWORD: paradise123
MYSQL_DATABASE: paradise_plants
MYSQL_USER: paradise_user
MYSQL_PASSWORD: paradise123
```

**Backend:**
```yaml
NODE_ENV: development
DB_HOST: mysql
DB_PORT: 3306
DB_NAME: paradise_plants
PORT: 3001
```

**Frontend:**
```yaml
VITE_API_URL: http://localhost:3001
VITE_CATALOG_API: http://localhost:3001
VITE_INVENTORY_API: http://localhost:3002
VITE_ORDERS_API: http://localhost:3003
VITE_REMINDERS_API: http://localhost:3004
```

---

## 📊 Docker Commands Reference

### Build Commands

```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build backend
docker-compose build frontend

# Rebuild without cache
docker-compose build --no-cache

# Build with progress output
docker-compose build --progress=plain
```

### Run Commands

```bash
# Start all services (detached)
docker-compose up -d

# Start with logs displayed
docker-compose up

# Start specific service
docker-compose up -d mysql
docker-compose up -d backend

# Recreate containers
docker-compose up -d --force-recreate

# Scale service (if stateless)
docker-compose up -d --scale backend=2
```

### Container Management

```bash
# View running containers
docker-compose ps

# View all containers (including stopped)
docker-compose ps -a

# View service logs
docker-compose logs
docker-compose logs -f mysql
docker-compose logs --tail=100 backend

# Execute command in container
docker-compose exec backend npm list
docker-compose exec mysql mysql -u paradise_user -pparadise123 -e "SHOW DATABASES;"

# Stop services
docker-compose stop

# Start services
docker-compose start

# Restart services
docker-compose restart backend

# Remove containers (keeps volumes)
docker-compose rm

# Remove everything including volumes
docker-compose down -v
```

### Image Commands

```bash
# List images
docker images
docker images | grep paradise-plants

# Remove image
docker rmi paradise-plants/frontend:latest

# Tag image
docker tag paradise-plants/frontend:latest paradise-plants/frontend:v1.0.0

# Push to registry
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/paradise-plants/frontend:latest
```

### Network Commands

```bash
# List networks
docker network ls

# Inspect network
docker network inspect paradise-network

# Check container network
docker inspect paradise-backend | grep NetworkSettings
```

---

## 🔍 Debugging & Monitoring

### View Container Logs

```bash
# Follow logs in real-time
docker-compose logs -f

# Last 50 lines
docker-compose logs --tail=50

# With timestamps
docker-compose logs -t

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Enter Container Shell

```bash
# Backend shell
docker-compose exec backend sh

# Frontend shell
docker-compose exec frontend sh

# MySQL shell
docker-compose exec mysql bash

# Run commands
docker-compose exec backend npm list
docker-compose exec mysql mysql -u root -pparadise123 -e "SHOW DATABASES;"
```

### Check Health

```bash
# Overall status
docker-compose ps

# Container health
docker inspect paradise-backend | grep "Health"

# Detailed info
docker-compose exec backend wget -O- http://localhost:3001/health

# Network connectivity
docker-compose exec backend ping mysql
docker-compose exec backend ping frontend
```

### Resource Usage

```bash
# CPU and memory
docker stats

# Specific container
docker stats paradise-backend

# Disk usage
docker system df

# Cleanup unused resources
docker system prune -a
```

---

## 🔒 Security Best Practices

### Implemented in Dockerfiles:

✅ **Non-Root User**
- Backend runs as `nodejs` user (UID 1001)
- Prevents privilege escalation

✅ **Minimal Base Images**
- Alpine Linux (5-20 MB vs 500+ MB)
- Reduced attack surface

✅ **Multi-Stage Build**
- Frontend build dependencies not in production image
- Smaller final image

✅ **Health Checks**
- Automatic container restart on failure
- Early problem detection

✅ **Signal Handling**
- dumb-init ensures graceful shutdowns
- Prevents zombie processes

✅ **Security Headers** (Frontend nginx.conf)
```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1
Referrer-Policy: no-referrer-when-downgrade
```

✅ **Input Validation**
- Database validation in backend
- API parameter checking

---

## 📈 Performance Optimization

### Image Size Optimization

**Frontend:**
- Alpine base: 5 MB
- Nginx build: ~20 MB
- Gzip compression enabled
- Asset caching: 1 year

**Backend:**
- Alpine base: 5 MB
- Production dependencies only
- Final size: ~100 MB

### Build Optimization

```bash
# Check layer sizes
docker history paradise-plants/frontend:latest

# Multi-stage build reduces size by 80%
# Frontend: 400MB → 20MB
# Backend: 200MB → 100MB
```

### Runtime Optimization

In `docker-compose.yml`:
```yaml
healthcheck:
  interval: 30s      # Check every 30 seconds
  timeout: 10s       # Timeout after 10 seconds
  retries: 3         # Restart after 3 failures
  start_period: 40s  # Allow 40s startup time
```

---

## 🚨 Common Issues & Solutions

### Port Already in Use

```bash
# Find process using port
lsof -i :3001
lsof -i :5173

# Kill process
sudo kill -9 <PID>

# Or use different port
docker run -p 3011:3001 paradise-plants/backend:latest
```

### Database Connection Failed

```bash
# Check MySQL health
docker-compose ps mysql

# Check MySQL logs
docker-compose logs mysql

# Test connection
docker-compose exec backend \
  mysql -h mysql -u paradise_user -pparadise123 -e "SELECT 1;"

# Restart MySQL
docker-compose restart mysql
```

### Frontend Can't Connect to Backend

```bash
# Check API URL environment variable
docker-compose exec frontend env | grep VITE

# Check network connectivity
docker-compose exec frontend ping backend

# Check frontend logs
docker-compose logs frontend

# Verify CORS is enabled in backend
```

### Out of Disk Space

```bash
# Clean up unused images and networks
docker system prune -a

# Remove volumes too (⚠️ deletes data)
docker system prune -a --volumes

# Check disk usage
docker system df
```

### Permission Denied Errors

```bash
# Linux only: Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Restart docker daemon
sudo systemctl restart docker
```

---

## 📦 Docker Registry (AWS ECR)

### Authenticate with AWS ECR

```bash
# Get login token
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  123456789.dkr.ecr.us-east-1.amazonaws.com

# Create repository
aws ecr create-repository \
  --repository-name paradise-plants/frontend \
  --region us-east-1

aws ecr create-repository \
  --repository-name paradise-plants/backend \
  --region us-east-1
```

### Push Images to ECR

```bash
# Tag images
docker tag paradise-plants/frontend:latest \
  123456789.dkr.ecr.us-east-1.amazonaws.com/paradise-plants/frontend:latest

docker tag paradise-plants/backend:latest \
  123456789.dkr.ecr.us-east-1.amazonaws.com/paradise-plants/backend:latest

# Push to ECR
docker push \
  123456789.dkr.ecr.us-east-1.amazonaws.com/paradise-plants/frontend:latest

docker push \
  123456789.dkr.ecr.us-east-1.amazonaws.com/paradise-plants/backend:latest
```

---

## ✅ Verification Checklist

- [ ] Docker installed (`docker --version`)
- [ ] Docker Compose installed (`docker-compose --version`)
- [ ] Images built successfully (`docker images`)
- [ ] Services running (`docker-compose ps`)
- [ ] Database accessible (`docker-compose exec mysql mysql ...`)
- [ ] Backend health check passes
- [ ] Frontend loads at http://localhost:5173
- [ ] API responds at http://localhost:3001
- [ ] PhpMyAdmin accessible at http://localhost:8080
- [ ] Logs show no errors (`docker-compose logs`)

---

## 🔄 Development Workflow

### Local Development Loop

```bash
# 1. Start services
docker-compose up -d

# 2. Make code changes (volumes auto-sync)
# Edit files in frontend/ or backend/

# 3. Rebuild if dependencies changed
docker-compose build backend

# 4. Restart service
docker-compose restart backend

# 5. Check logs
docker-compose logs -f backend

# 6. Test changes
# Frontend: http://localhost:5173
# API: http://localhost:3001
```

### Production Build

```bash
# Build for production
docker build -t paradise-plants/frontend:v1.0.0 ./frontend/
docker build -t paradise-plants/backend:v1.0.0 ./backend/

# Tag and push
docker tag paradise-plants/frontend:v1.0.0 \
  <registry>/paradise-plants/frontend:v1.0.0
docker push <registry>/paradise-plants/frontend:v1.0.0

# Deploy to Kubernetes
kubectl set image deployment/frontend \
  frontend=<registry>/paradise-plants/frontend:v1.0.0
```

---

## Next Steps

1. ✅ Run `docker-compose up -d`
2. ✅ Verify services: `docker-compose ps`
3. ✅ Test application: http://localhost:5173
4. ✅ Review logs: `docker-compose logs -f`
5. ✅ Read [2-DEVOPS_WORKFLOW.md](/docs/2-DEVOPS_WORKFLOW.md) for EKS deployment
6. ✅ Follow [3-INSTALLATION_GUIDE.md](/docs/3-INSTALLATION_GUIDE.md) for Terraform

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Best Practices for Writing Dockerfiles](https://docs.docker.com/develop/dev-best-practices/)
- [Node.js in Docker](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Nginx Configuration](https://nginx.org/en/docs/)

---

**Happy containerizing! 🐳**
