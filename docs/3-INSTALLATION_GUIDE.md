# 📦 Installation Guide - All Tools & Packages

Complete step-by-step guide to install all necessary tools for local development and DevOps pipeline.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Development Tools](#development-tools)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Docker Setup](#docker-setup)
6. [AWS & Cloud Tools](#aws--cloud-tools)
7. [Infrastructure as Code](#infrastructure-as-code)
8. [CI/CD Tools](#cicd-tools)
9. [Kubernetes Tools](#kubernetes-tools)
10. [Monitoring & Logging Tools](#monitoring--logging-tools)
11. [Verification & Testing](#verification--testing)

---

## Prerequisites

### System Requirements
- **OS**: macOS, Linux, or Windows with WSL2
- **RAM**: Minimum 8GB (16GB recommended)
- **Disk**: 50GB free space
- **Internet**: Stable connection for package downloads

### Check Your System

**macOS:**
```bash
uname -m  # Should show arm64 (M1/M2/M3) or x86_64
sw_vers   # Check macOS version
```

**Linux:**
```bash
lsb_release -a
uname -m
```

**Windows (WSL2):**
```bash
wsl --list --verbose
```

---

## Development Tools

### 1️⃣ Homebrew (macOS Package Manager)

**macOS Only:**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Verify
brew --version
```

---

### 2️⃣ Git

**macOS:**
```bash
brew install git
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install -y git
```

**Windows (WSL2):**
```bash
sudo apt-get install -y git
```

**Verify:**
```bash
git --version
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

---

### 3️⃣ Node.js & npm (Backend Runtime)

**Option A: Using Homebrew (macOS/Linux)**
```bash
brew install node
```

**Option B: Using nvm (Node Version Manager) - Recommended**

**macOS/Linux:**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Close and reopen terminal or:
source ~/.bashrc  # Linux
source ~/.zprofile # macOS

# Install Node.js
nvm install 18
nvm use 18
nvm alias default 18
```

**Windows (WSL2):**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
```

**Option C: Direct Download**
- Visit [nodejs.org](https://nodejs.org)
- Download LTS version (18.x or 20.x)
- Run installer

**Verify:**
```bash
node --version    # v18.x.x
npm --version     # 9.x.x
```

**Update npm:**
```bash
npm install -g npm@latest
```

---

### 4️⃣ Bun (Fast JavaScript Runtime) - Optional

```bash
curl -fsSL https://bun.sh/install | bash

# Add to PATH
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# Verify
bun --version
```

---

### 5️⃣ Text Editor / IDE

**VS Code (Recommended):**
```bash
# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu)
sudo snap install code --classic

# Windows
Download from https://code.visualstudio.com
```

**Extensions to Install:**
```bash
code --install-extension ms-python.python
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension ms-vscode.makefile-tools
code --install-extension HashiCorp.terraform
code --install-extension ms-kubernetes-tools.vscode-kubernetes-tools
```

---

## Backend Setup

### 1️⃣ Install Backend Dependencies

```bash
# Navigate to backend
cd /Users/subhasmitadas/Desktop/Plants_of_paradise/backend

# Install npm packages
npm install

# Verify
npm list  # Shows installed packages
```

### 2️⃣ Create .env File

```bash
cat > backend/.env << 'EOF'
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=paradise_plants

# Service Ports
PORT=3001
CATALOG_PORT=3001
INVENTORY_PORT=3002
ORDERS_PORT=3003
REMINDERS_PORT=3004

# Environment
NODE_ENV=development

# API Configuration
API_TIMEOUT=30000
API_RETRIES=3
EOF
```

### 3️⃣ Install MySQL (Database)

**Using Homebrew (macOS):**
```bash
brew install mysql

# Start MySQL
brew services start mysql

# Secure MySQL
mysql_secure_installation
# Follow prompts, set root password

# Verify
mysql --version
mysql -u root -p -e "SELECT VERSION();"
```

**Docker Approach:**
```bash
# Use Docker instead (easier)
docker pull mysql:8.0
docker run -d \
  --name paradise-mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=paradise_plants \
  -p 3306:3306 \
  mysql:8.0

# Verify
docker exec paradise-mysql mysql -u root -ppassword -e "SHOW DATABASES;"
```

### 4️⃣ Initialize Database

```bash
# Connect to MySQL
mysql -u root -p

# Create database and tables
mysql -u root -p paradise_plants < backend/shared/database/schema.sql

# Seed sample data
mysql -u root -p paradise_plants < backend/shared/database/seed.sql

# Verify
mysql -u root -p -e "USE paradise_plants; SHOW TABLES;"
```

---

## Frontend Setup

### 1️⃣ Install Frontend Dependencies

```bash
# Navigate to frontend
cd /Users/subhasmitadas/Desktop/Plants_of_paradise/frontend

# Install npm packages
npm install

# Verify
npm list
```

### 2️⃣ Create Frontend .env (Optional)

```bash
cat > frontend/.env << 'EOF'
VITE_API_URL=http://localhost:3001
VITE_CATALOG_API=http://localhost:3001
VITE_INVENTORY_API=http://localhost:3002
VITE_ORDERS_API=http://localhost:3003
VITE_REMINDERS_API=http://localhost:3004
EOF
```

### 3️⃣ Verify Frontend Build

```bash
npm run build
npm run preview
```

---

## Docker Setup

### 1️⃣ Install Docker

**macOS:**
```bash
brew install --cask docker

# Start Docker Desktop from Applications
# Or use Colima (lightweight alternative)
brew install colima
colima start
```

**Linux (Ubuntu):**
```bash
# Add Docker repository
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

**Windows (WSL2):**
```bash
# Download Docker Desktop for Windows from docker.com
# Install it, configure to use WSL2 backend
```

**Verify:**
```bash
docker --version
docker run hello-world
```

### 2️⃣ Install Docker Compose

**macOS/Linux (if not included):**
```bash
brew install docker-compose

# Or install via pip
pip install docker-compose
```

**Verify:**
```bash
docker-compose --version
```

### 3️⃣ Create Dockerfiles

**Frontend - `frontend/Dockerfile`:**
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Backend - `backend/Dockerfile`:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001 3002 3003 3004
CMD ["npm", "start"]
```

### 4️⃣ Build Docker Images

```bash
# Frontend
cd frontend
docker build -t paradise-plants/frontend:1.0.0 .

# Backend (main)
cd ../backend
docker build -t paradise-plants/backend:1.0.0 .

# Verify
docker images | grep paradise-plants
```

---

## AWS & Cloud Tools

### 1️⃣ Install AWS CLI

**macOS:**
```bash
brew install awscli

# Or via pip
pip install awscliv2
```

**Linux:**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

**Windows (WSL2):**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

**Verify:**
```bash
aws --version
```

### 2️⃣ Configure AWS Credentials

```bash
aws configure

# Enter when prompted:
# AWS Access Key ID: [your-access-key]
# AWS Secret Access Key: [your-secret-key]
# Default region name: us-east-1 (or your preferred region)
# Default output format: json
```

**Verify:**
```bash
aws sts get-caller-identity
```

### 3️⃣ Install AWS SAM (for serverless functions - Optional)

```bash
brew install aws-sam-cli

# Verify
sam --version
```

---

## Infrastructure as Code

### 1️⃣ Install Terraform

**macOS:**
```bash
brew install terraform
```

**Linux:**
```bash
wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
unzip terraform_1.6.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/
```

**Verify:**
```bash
terraform --version
```

### 2️⃣ Install Terraform Modules

```bash
cd terraform/

# Initialize Terraform
terraform init

# Validate configuration
terraform validate

# Format code
terraform fmt -recursive
```

### 3️⃣ Create terraform.tfvars

```bash
cat > terraform/terraform.tfvars << 'EOF'
aws_region             = "us-east-1"
cluster_name           = "paradise-plants-eks"
cluster_version        = "1.27"
node_group_name        = "paradise-plants-nodes"
node_desired_size      = 3
node_min_size          = 3
node_max_size          = 10
node_instance_types    = ["t3.medium"]
environment            = "production"
project_name           = "paradise-plants"

# Database
db_instance_class      = "db.t3.small"
db_allocated_storage   = 100
db_engine_version      = "8.0.35"

# OpenSearch
opensearch_version     = "2.7"
opensearch_domain_name = "paradise-plants-logs"
opensearch_node_count  = 3
EOF
```

---

## CI/CD Tools

### 1️⃣ Install Jenkins (Option A: Docker)

```bash
docker run -d \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  --name jenkins \
  jenkins/jenkins:lts

# Get initial password
docker logs jenkins | grep "initialAdminPassword"

# Access at http://localhost:8080
```

**Jenkins Plugins to Install:**
- Blue Ocean
- Docker Pipeline
- Git
- GitHub Integration
- Kubernetes CLI
- Helm
- Pipeline

### 2️⃣ Install Jenkins (Option B: Native - macOS)

```bash
brew install jenkins-lts
brew services start jenkins-lts

# Access at http://localhost:8080
```

### 3️⃣ Configure Jenkins

1. Complete setup wizard
2. Create admin user
3. Install suggested plugins
4. Add GitHub credentials
5. Create pipeline job
6. Configure webhook in GitHub

---

## Kubernetes Tools

### 1️⃣ Install kubectl (Kubernetes CLI)

**macOS:**
```bash
brew install kubectl
```

**Linux:**
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

**Windows (WSL2):**
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

**Verify:**
```bash
kubectl version --client
```

### 2️⃣ Install Helm (Kubernetes Package Manager)

**macOS:**
```bash
brew install helm
```

**Linux:**
```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

**Verify:**
```bash
helm version
```

### 3️⃣ Install kubectx/kubens (Context Switching)

```bash
# macOS
brew install kubectx

# Linux
sudo git clone https://github.com/ahmetb/kubectx /opt/kubectx
sudo ln -s /opt/kubectx/kubectx /usr/local/bin/kubectx
sudo ln -s /opt/kubectx/kubens /usr/local/bin/kubens
```

### 4️⃣ Configure kubectl for EKS

```bash
# After Terraform creates EKS
aws eks update-kubeconfig --region us-east-1 --name paradise-plants-eks

# Verify
kubectl get nodes
kubectl get pods --all-namespaces
```

---

### 5️⃣ Install ArgoCD (Continuous Deployment)

```bash
# Create namespace
kubectl create namespace argocd

# Install ArgoCD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Wait for rollout
kubectl rollout status deployment/argocd-server -n argocd

# Get initial password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

# Port forward
kubectl port-forward svc/argocd-server -n argocd 8081:443

# Access at https://localhost:8081
```

---

## Monitoring & Logging Tools

### 1️⃣ Install Prometheus (Metrics Collection)

**Using Helm:**
```bash
# Add Prometheus Helm repo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install
kubectl create namespace monitoring
helm install prometheus prometheus-community/kube-prometheus-stack \
  -n monitoring \
  --values prometheus-values.yaml
```

**Verify:**
```bash
kubectl get pods -n monitoring
kubectl port-forward svc/prometheus-operated -n monitoring 9090:9090
# Access at http://localhost:9090
```

### 2️⃣ Install Grafana (Visualization)

**Included with Prometheus stack or:**
```bash
helm install grafana grafana/grafana -n monitoring

# Get admin password
kubectl get secret --namespace monitoring grafana -o jsonpath="{.data.admin-password}" | base64 --decode

# Port forward
kubectl port-forward svc/grafana -n monitoring 3000:80
# Access at http://localhost:3000
```

### 3️⃣ Install OpenSearch (Log Aggregation)

**Using Docker for local testing:**
```bash
docker run -d \
  -p 9200:9200 \
  -p 9600:9600 \
  -e discovery.type=single-node \
  -e OPENSEARCH_JAVA_OPTS="-Xms512m -Xmx512m" \
  opensearchproject/opensearch:latest

# Verify
curl -u admin:admin https://localhost:9200
```

**For EKS, use AWS OpenSearch Service:**
```bash
# See Terraform configuration for AWS OpenSearch setup
```

### 4️⃣ Install Fluentd (Log Shipper)

```bash
# Create namespace
kubectl create namespace logging

# Add Fluent Helm repo
helm repo add fluent https://fluent.github.io/helm-charts
helm repo update

# Install Fluent Bit
helm install fluent-bit fluent/fluent-bit -n logging
```

---

## Verification & Testing

### 1️⃣ Verify All Installations

```bash
# Development Tools
node --version
npm --version
git --version
docker --version
docker-compose --version

# AWS Tools
aws --version
terraform --version

# Kubernetes Tools
kubectl version --client
helm version
kubectx --current
```

### 2️⃣ Test Backend

```bash
cd backend
npm install
npm run dev

# In another terminal
curl http://localhost:3001/api/plants
```

### 3️⃣ Test Frontend

```bash
cd frontend
npm install
npm run dev

# Open http://localhost:5173
```

### 4️⃣ Test Docker

```bash
# Build images
docker build -t paradise-plants/frontend:1.0.0 frontend/
docker build -t paradise-plants/backend:1.0.0 backend/

# Run locally
docker-compose up -d

# Verify
docker ps
docker logs backend_service_name

# Cleanup
docker-compose down
```

### 5️⃣ Test Terraform

```bash
cd terraform
terraform init
terraform plan -out=tfplan
terraform apply tfplan
```

### 6️⃣ Test Kubernetes

```bash
# Create test namespace
kubectl create namespace test

# Deploy test pod
kubectl run test-pod --image=nginx -n test

# Check pod
kubectl get pods -n test
kubectl describe pod test-pod -n test

# Cleanup
kubectl delete namespace test
```

---

## Quick Start Commands

### Development Environment (Local)

```bash
# Terminal 1: Database
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=paradise_plants mysql:8.0

# Terminal 2: Backend
cd backend && npm install && npm run dev

# Terminal 3: Frontend
cd frontend && npm install && npm run dev

# Access
# Frontend: http://localhost:5173
# API: http://localhost:3001
```

### Docker Environment (Local)

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Environment (EKS)

```bash
# Create infrastructure
cd terraform
terraform init
terraform apply -auto-approve

# Configure kubectl
aws eks update-kubeconfig --name paradise-plants-eks --region us-east-1

# Deploy with helm
helm install paradise-plants ./helm/paradise-plants/ -n paradise-plants --create-namespace

# Verify deployment
kubectl get all -n paradise-plants
```

---

## Troubleshooting

### Port Already in Use

```bash
# macOS/Linux
lsof -i :3001
kill -9 <PID>

# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Docker Issues

```bash
# Clean up
docker system prune -a

# Restart Docker daemon
docker daemon restart
```

### Kubernetes Issues

```bash
# Check cluster status
kubectl cluster-info
kubectl get nodes -o wide

# Check pod logs
kubectl logs <pod-name> -n <namespace>

# Describe pod for errors
kubectl describe pod <pod-name> -n <namespace>
```

### Database Connection Issues

```bash
# Test MySQL connection
mysql -h 127.0.0.1 -u root -p

# Check environment variables
env | grep DB_

# Verify database exists
mysql -u root -p -e "SHOW DATABASES;"
```

---

## Next Steps

1. ✅ Complete all installations above
2. ✅ Follow **1-ARCHITECTURE.md** to understand project structure
3. ✅ Review **2-DEVOPS_WORKFLOW.md** for deployment architecture
4. ✅ Test local development environment
5. ✅ Set up AWS accounts and configure credentials
6. ✅ Create Terraform infrastructure
7. ✅ Configure CI/CD pipeline
8. ✅ Deploy to EKS

---

## Additional Resources

| Resource | Link |
|----------|------|
| Node.js | https://nodejs.org |
| Docker Docs | https://docs.docker.com |
| AWS Documentation | https://docs.aws.amazon.com |
| Kubernetes Docs | https://kubernetes.io/docs |
| Terraform Docs | https://www.terraform.io/docs |
| Helm Docs | https://helm.sh |
| ArgoCD | https://argoproj.github.io/argo-cd |

---

## Support

For issues:
1. Check logs: `docker logs`, `kubectl logs`
2. Review error messages carefully
3. Search GitHub issues for similar problems
4. Post in project issues with:
   - OS and version
   - Tool versions
   - Full error message
   - Steps to reproduce
