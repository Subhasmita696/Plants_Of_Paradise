# 📚 Paradise Plants - Complete Documentation

Welcome to the comprehensive documentation for deploying Paradise Plants to AWS EKS with full DevOps infrastructure!

---

## 📖 Documentation Files

### **1️⃣ Architecture Documentation**
📄 **File:** [1-ARCHITECTURE.md](1-ARCHITECTURE.md)

**Learn:**
- Complete project folder structure
- Which files belong to frontend vs backend
- Technology stack (React, Node.js, MySQL, Docker)
- How frontend and backend services communicate
- REST API endpoints and data flow
- Service-to-service communication
- Database schema overview

**Best for:** Understanding how the application works from a developer's perspective

**Key sections:**
```
├── Complete folder structure
├── Architecture diagrams
├── Service communication flows
├── Technology stack breakdown
├── Data flow examples
└── Scalability considerations
```

---

### **2️⃣ DevOps Workflow Documentation**
📄 **File:** [2-DEVOPS_WORKFLOW.md](2-DEVOPS_WORKFLOW.md)

**Learn:**
- How many servers and AWS resources are created
- Complete infrastructure breakdown
- CI/CD pipeline (Jenkins or AWS CodePipeline)
- CD with ArgoCD and Helm
- Kubernetes cluster architecture
- Tool integration diagram
- Auto-scaling strategy
- Monitoring and alerting setup
- Disaster recovery plan

**Best for:** Understanding the complete DevOps architecture and how tools integrate

**Key sections:**
```
├── Infrastructure overview (15-20 AWS resources)
├── CI/CD pipeline architecture
├── Tool integration flow
├── Kubernetes namespaces & resources
├── Auto-scaling strategy
├── Monitoring & alerting
├── Deployment workflow
└── Production checklist
```

---

### **3️⃣ Installation Guide**
📄 **File:** [3-INSTALLATION_GUIDE.md](3-INSTALLATION_GUIDE.md)

**Learn:**
- Step-by-step installation of all tools
- Backend setup (Node.js, npm, Express)
- Frontend setup (React, Vite, Shadcn UI)
- Docker installation and configuration
- AWS CLI setup and credentials
- Terraform installation
- Jenkins installation
- Kubernetes tools (kubectl, Helm, ArgoCD)
- Monitoring tools (Prometheus, Grafana, OpenSearch)
- Verification and testing
- Troubleshooting common issues

**Best for:** DevOps engineers setting up the development and production environments

**Key sections:**
```
├── Prerequisites & system requirements
├── Development tools (Git, Node.js, Docker)
├── Backend setup & database
├── Frontend setup
├── Docker & container tools
├── AWS tools (CLI, credentials)
├── Infrastructure as Code (Terraform)
├── CI/CD tools (Jenkins)
├── Kubernetes tools (kubectl, Helm, ArgoCD)
├── Monitoring tools
├── Verification commands
├── Quick start scripts
└── Troubleshooting guide
```

---

## 🚀 Quick Navigation

### **I want to understand the project structure**
→ Start with [1-ARCHITECTURE.md](1-ARCHITECTURE.md)

### **I want to set up development environment**
→ Follow [3-INSTALLATION_GUIDE.md](3-INSTALLATION_GUIDE.md)

### **I want to deploy to AWS EKS**
→ Read [2-DEVOPS_WORKFLOW.md](2-DEVOPS_WORKFLOW.md) then [3-INSTALLATION_GUIDE.md](3-INSTALLATION_GUIDE.md)

### **I want to understand CI/CD pipeline**
→ See [2-DEVOPS_WORKFLOW.md](2-DEVOPS_WORKFLOW.md) - CI/CD Pipeline Architecture section

### **I want to set up monitoring**
→ Check [2-DEVOPS_WORKFLOW.md](2-DEVOPS_WORKFLOW.md) - Monitoring & Alerting section
→ Then follow [3-INSTALLATION_GUIDE.md](3-INSTALLATION_GUIDE.md) - Monitoring & Logging Tools

---

## 📋 Project Summary

### Application Structure
- **Frontend:** React + TypeScript + Vite + Shadcn UI (Port 5173)
- **Backend:** 4 Node.js Microservices (Ports 3001-3004)
  - Catalog Service (3001)
  - Inventory Service (3002)
  - Orders Service (3003)
  - Care Reminders Service (3004)
- **Database:** MySQL
- **Containerization:** Docker

### Infrastructure (EKS)
- **Compute:** 3+ EC2 nodes (t3.medium) in EKS cluster
- **Container Registry:** 5 ECR repositories
- **Database:** RDS MySQL or K8s StatefulSet
- **Monitoring:** Prometheus + Grafana
- **Logging:** OpenSearch + Fluentd
- **Audit:** CloudTrail + CloudWatch

### DevOps Pipeline
1. **CI:** Jenkins/AWS CodeBuild
2. **Registry:** AWS ECR
3. **Infrastructure:** Terraform
4. **Package Manager:** Helm
5. **CD:** ArgoCD
6. **Orchestration:** Kubernetes (EKS)

---

## 🔄 Complete Deployment Flow

```
1. Developer pushes code
        ↓
2. GitHub webhook triggers Jenkins
        ↓
3. Jenkins builds & runs tests
        ↓
4. Docker images pushed to ECR
        ↓
5. Helm values updated
        ↓
6. ArgoCD syncs changes
        ↓
7. EKS deploys new pods
        ↓
8. Metrics → Prometheus → Grafana
9. Logs → Fluentd → OpenSearch
10. Audit → CloudTrail
```

---

## 🛠️ Tools & Technologies

| Component | Tools |
|-----------|-------|
| **Source Control** | Git, GitHub |
| **Build** | npm, Vite, Node.js |
| **CI** | Jenkins or AWS CodeBuild |
| **Registry** | AWS ECR |
| **Infrastructure** | Terraform |
| **Container Orchestration** | Kubernetes (EKS) |
| **Package Manager** | Helm |
| **Continuous Deployment** | ArgoCD |
| **Monitoring** | Prometheus, Grafana |
| **Logging** | OpenSearch, Fluentd, CloudWatch |
| **Audit** | CloudTrail |

---

## ✅ Getting Started Checklist

### Phase 1: Local Development
- [ ] Read 1-ARCHITECTURE.md to understand the project
- [ ] Follow 3-INSTALLATION_GUIDE.md to install all tools
- [ ] Run backend locally (`npm run dev`)
- [ ] Run frontend locally (`npm run dev`)
- [ ] Test database connection

### Phase 2: Docker & Local Deployment
- [ ] Create Dockerfiles for all services
- [ ] Create docker-compose.yml
- [ ] Build Docker images locally
- [ ] Run entire stack with docker-compose
- [ ] Verify all services communicate

### Phase 3: AWS Setup
- [ ] Configure AWS credentials
- [ ] Study 2-DEVOPS_WORKFLOW.md infrastructure section
- [ ] Create Terraform configurations
- [ ] Run Terraform to create AWS infrastructure
- [ ] Verify EKS cluster is running

### Phase 4: CI/CD Pipeline
- [ ] Create Dockerfiles for each service
- [ ] Create Helm charts
- [ ] Set up Jenkins pipeline
- [ ] Configure GitHub webhook
- [ ] Test complete pipeline with a test deployment

### Phase 5: Monitoring & Logging
- [ ] Install Prometheus in EKS
- [ ] Install Grafana
- [ ] Create monitoring dashboards
- [ ] Set up OpenSearch for log aggregation
- [ ] Configure alerting rules

### Phase 6: Production Deployment
- [ ] Perform load testing
- [ ] Set up backup strategies
- [ ] Document runbooks
- [ ] Perform disaster recovery drill
- [ ] Deploy to production

---

## 📞 Document Statistics

| Document | Pages | Sections | Diagrams |
|----------|-------|----------|----------|
| 1-ARCHITECTURE.md | ~15 | 12+ | 3+ |
| 2-DEVOPS_WORKFLOW.md | ~18 | 15+ | 4+ |
| 3-INSTALLATION_GUIDE.md | ~20 | 20+ | Reference tables |
| **Total** | **~53** | **47+** | **7+** |

---

## 🆘 If You're Stuck

### For Architecture Questions
→ Refer to [1-ARCHITECTURE.md](1-ARCHITECTURE.md#-how-components-communicate)

### For Setup Issues
→ Check [3-INSTALLATION_GUIDE.md](3-INSTALLATION_GUIDE.md#troubleshooting)

### For Deployment Questions
→ See [2-DEVOPS_WORKFLOW.md](2-DEVOPS_WORKFLOW.md#-deployment-workflow-example)

### For CI/CD Questions
→ Review [2-DEVOPS_WORKFLOW.md](2-DEVOPS_WORKFLOW.md#--cicd-pipeline-architecture)

---

## 📈 Next Steps

1. **First-time setup:** Start with document 1, then 3
2. **DevOps engineers:** Read documents 2 and 3 in order
3. **Developers:** Read document 1, skim document 3 (setup)
4. **Architects:** Review all three documents for complete understanding

---

## 📞 Version Info

- **Created:** April 2026
- **Project:** Paradise Plants
- **Version:** 1.0.0
- **Documentation Version:** 1.0.0

---

## 📋 Document Checklist

✅ 1-ARCHITECTURE.md - Complete project structure & architecture
✅ 2-DEVOPS_WORKFLOW.md - Complete DevOps infrastructure & pipeline
✅ 3-INSTALLATION_GUIDE.md - Complete installation instructions for all tools

All documentation is production-ready and comprehensive!

---

**Happy Deploying! 🚀**
