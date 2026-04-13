# 🚀 DevOps Workflow Documentation - Paradise Plants

## Complete DevOps Architecture for EKS Deployment

---

## 📋 Infrastructure Overview

### Total Servers & Resources Created

```
AWS INFRASTRUCTURE
├── NETWORKING (VPC)
│   ├── 1x VPC (10.0.0.0/16)
│   ├── 2-3x Public Subnets (for NAT Gateway, ALB)
│   ├── 2-3x Private Subnets (for EKS nodes)
│   ├── 1x Internet Gateway
│   ├── 1x NAT Gateway
│   └── Route Tables (Public & Private)
│
├── EKS CLUSTER (Kubernetes)
│   ├── 1x EKS Control Plane (Managed by AWS)
│   ├── 3x Worker Nodes (EC2 instances in ASG)
│   │   ├── t3.medium/large (adjustable)
│   │   └── Auto Scaling Group (min: 3, max: 10)
│   ├── 1x EKS Security Group
│   └── Node IAM Role
│
├── CONTAINER REGISTRY
│   ├── 1x ECR Private Repository (Frontend)
│   ├── 1x ECR Private Repository (Catalog Service)
│   ├── 1x ECR Private Repository (Inventory Service)
│   ├── 1x ECR Private Repository (Orders Service)
│   └── 1x ECR Private Repository (Care Reminders Service)
│
├── DATABASE
│   ├── 1x RDS MySQL (Optional, or managed in K8s)
│   │   ├── Multi-AZ enabled
│   │   └── Automated backups
│   └── OR: 1x MySQL StatefulSet in K8s
│
├── MONITORING & LOGGING
│   ├── 1x OpenSearch Cluster (3+ nodes)
│   ├── Prometheus (StatefulSet in K8s)
│   ├── Grafana (Deployment in K8s)
│   ├── CloudWatch (AWS native)
│   ├── CloudTrail (Audit logs)
│   └── Elastic Stack (optional)
│
├── CI/CD INFRASTRUCTURE
│   ├── Jenkins Server (EC2 or managed)
│   ├── OR: AWS CodePipeline + CodeBuild
│   └── GitHub/GitLab integration
│
├── STORAGE
│   ├── 1x S3 Bucket (artifacts, backups)
│   ├── 1x EBS Volumes (K8s persistent volumes)
│   └── 1x EFS (optional, for shared storage)
│
└── SECURITY
    ├── IAM Roles & Policies
    ├── Security Groups (EKS, RDS, etc.)
    ├── KMS (encryption)
    └── Secrets Manager (credentials)
```

### Server Count Summary
- **1x VPC** with multi-AZ setup
- **1x EKS Cluster** with 3+ worker nodes = **3+ EC2 instances**
- **5x ECR Repositories** (1 per service)
- **1x RDS MySQL** or **K8s StatefulSet**
- **3+ OpenSearch nodes** for logging
- **1x Jenkins** or AWS CodePipeline
- **1x S3 Bucket** for artifacts

**Total: ~15-20 AWS resources** (varies by configuration)

---

## 🔄 CI/CD Pipeline Architecture

### Option 1: Jenkins Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                    GIT REPOSITORY (GitHub)                  │
│  (Push to main branch triggers pipeline)                    │
└────────────────────────┬────────────────────────────────────┘
                         │ Webhook
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              JENKINS SERVER (CI/CD Orchestrator)            │
│                                                             │
│  STAGE 1: SOURCE                                            │
│  ├─ Clone repository                                        │
│  └─ Checkout main branch                                    │
│                                                             │
│  STAGE 2: BUILD                                             │
│  ├─ Frontend:                                               │
│  │  ├─ npm install                                          │
│  │  ├─ npm run build                                        │
│  │  └─ Create Docker image                                  │
│  │                                                          │
│  ├─ Backend Services:                                       │
│  │  ├─ npm install                                          │
│  │  ├─ Run tests                                            │
│  │  └─ Create Docker images (4x services)                   │
│  │                                                          │
│  └─ Build artifacts                                         │
│                                                             │
│  STAGE 3: TEST                                              │
│  ├─ Unit tests                                             │
│  ├─ Integration tests                                      │
│  └─ Build & run containers locally                        │
│                                                             │
│  STAGE 4: PUSH TO ECR                                       │
│  ├─ Tag images                                              │
│  ├─ Push to AWS ECR                                         │
│  │  ├─ Frontend → ECR                                       │
│  │  ├─ Catalog Service → ECR                                │
│  │  ├─ Inventory Service → ECR                              │
│  │  ├─ Orders Service → ECR                                 │
│  │  └─ Care Reminders Service → ECR                         │
│  └─ Update image tags                                       │
│                                                             │
│  STAGE 5: TRIGGER CD (ArgoCD)                               │
│  └─ Update Helm values with new image tags                  │
└────────┬─────────────────────────────────────────────────────┘
         │ Calls ArgoCD API
         ▼
┌─────────────────────────────────────────────────────────────┐
│         ARGOCD (Continuous Deployment Tool)                 │
│                                                             │
│  ├─ Watches Git repository for changes                      │
│  ├─ Compares desired state (Git) vs actual state (EKS)     │
│  ├─ Applies Helm charts to EKS cluster                      │
│  ├─ Performs rolling updates                                │
│  ├─ Handles rollbacks if needed                             │
│  └─ Sends notifications                                     │
└────────┬─────────────────────────────────────────────────────┘
         │ Deploys to
         ▼
┌─────────────────────────────────────────────────────────────┐
│     AWS EKS CLUSTER (Kubernetes - Production)               │
│                                                             │
│  paradise-plants namespace                                 │
│  ├─ Frontend Deployment (3x replicas)                      │
│  ├─ Catalog Service Deployment (3x replicas)               │
│  ├─ Inventory Service Deployment (3x replicas)             │
│  ├─ Orders Service Deployment (3x replicas)                │
│  ├─ Care Reminders Service Deployment (3x replicas)        │
│  ├─ MySQL StatefulSet (1x replica)                         │
│  ├─ Prometheus Deployment                                  │
│  ├─ Grafana Deployment                                     │
│  ├─ OpenSearch Deployment (3+ nodes)                       │
│  ├─ Services (ClusterIP, LoadBalancer)                     │
│  ├─ Ingress (AWS ALB)                                      │
│  └─ ConfigMaps & Secrets                                   │
│                                                             │
│  Automated:                                                │
│  ├─ Health checks & auto-healing                           │
│  ├─ Horizontal Pod Autoscaling (HPA)                       │
│  ├─ Persistent Volume Claims (for databases)               │
│  └─ Resource quotas & limits                               │
└─────────────────────────────────────────────────────────────┘
```

### Option 2: AWS CodePipeline

```
CodeCommit (Source) 
    ↓
CodeBuild (Build & Push to ECR)
    ↓
CodeDeploy or ArgoCD (Deploy to EKS)
    ↓
EKS Cluster (Runtime)
```

---

## 🛠️ DevOps Tools Integration

### Complete Tool Stack

| Layer | Tool | Purpose | Integration |
|-------|------|---------|-------------|
| **Source Control** | GitHub/GitLab | Version control | Webhook → Jenkins |
| **CI** | Jenkins | Build & test | Dockerfile → ECR |
| **Container Registry** | AWS ECR | Store images | Pull in EKS |
| **Infrastructure as Code** | Terraform | AWS resources | Apply to create VPC, EKS, RDS |
| **Configuration Management** | Helm | K8s deployments | Charts → ArgoCD |
| **CD** | ArgoCD | Auto-deploy to EKS | Watches Git, syncs state |
| **Container Orchestration** | Kubernetes (EKS) | Run containers | Runs 15+ pods |
| **Logging** | OpenSearch | Centralized logs | Collects from all pods |
| **Monitoring** | Prometheus | Metrics scraping | Scrapes pod metrics |
| **Visualization** | Grafana | Dashboards | Graphs Prometheus data |
| **Audit Logs** | CloudTrail | AWS API audit | Tracks all AWS changes |
| **Cloud Logs** | CloudWatch | AWS logs | Logs EKS events |
| **Secrets** | AWS Secrets Manager | Credential management | Store DB passwords |
| **Storage** | S3 + EBS | Persistent data | Backups & volumes |

---

## 🔗 Tool Integration Flow

```
GIT REPOSITORY
    ↓ (Webhook)
JENKINS
    ├─ Builds Docker images
    ├─ Runs tests
    └─ Pushes to ECR
         ↓
AWS ECR (Container Registry)
    ├─ Stores 5 Docker images
    └─ Triggers deployment
         ↓
HELM (K8s Package Manager)
    └─ Updates values.yaml with new image tags
         ↓
GIT (Helm values branch)
         ↓ (ArgoCD watches)
ARGOCD (CD Tool)
    ├─ Detects changes
    ├─ Compares desired vs actual
    └─ Applies changes to EKS
         ↓
KUBERNETES (EKS)
    ├─ Schedules pods
    ├─ Manages deployments
    ├─ Health checks
    └─ Auto-scaling
         ↓
    ├─ Application logs → OpenSearch/CloudWatch
    ├─ Metrics → Prometheus → Grafana
    └─ AWS API calls → CloudTrail

OPENSEARCH, PROMETHEUS, GRAFANA
    └─ Dashboards for monitoring
```

---

## 📊 Kubernetes Cluster Architecture

### Kubernetes Namespaces

```
EKS Cluster
├── default
├── kube-system (system pods)
├── kube-public
│
├── paradise-plants (production)
│   ├── Deployments:
│   │   ├── frontend (3 replicas)
│   │   ├── catalog-service (3 replicas)
│   │   ├── inventory-service (3 replicas)
│   │   ├── orders-service (3 replicas)
│   │   ├── care-reminders-service (3 replicas)
│   │   ├── prometheus (1 replica)
│   │   └── grafana (1 replica)
│   │
│   ├── StatefulSets:
│   │   ├── mysql (1 replica)
│   │   └── opensearch (3+ replicas)
│   │
│   ├── Services:
│   │   ├── frontend-service (LoadBalancer)
│   │   ├── catalog-service-svc (ClusterIP)
│   │   ├── inventory-service-svc (ClusterIP)
│   │   ├── orders-service-svc (ClusterIP)
│   │   ├── care-reminders-service-svc (ClusterIP)
│   │   ├── mysql-service (ClusterIP)
│   │   ├── opensearch-service (ClusterIP)
│   │   ├── prometheus-service (ClusterIP)
│   │   └── grafana-service (LoadBalancer)
│   │
│   ├── Ingress:
│   │   ├── paradise-plants-ingress
│   │   │   ├── /api/catalog → catalog-service
│   │   │   ├── /api/inventory → inventory-service
│   │   │   ├── /api/orders → orders-service
│   │   │   ├── /api/reminders → care-reminders-service
│   │   │   ├── / → frontend
│   │   │   └── /grafana → grafana-service
│   │
│   ├── ConfigMaps:
│   │   ├── mysql-config
│   │   ├── prometheus-config
│   │   ├── opensearch-config
│   │   └── app-config
│   │
│   ├── Secrets:
│   │   ├── db-credentials
│   │   ├── api-keys
│   │   ├── tls-cert
│   │   └── docker-registry
│   │
│   ├── PersistentVolumeClaims:
│   │   ├── mysql-pvc
│   │   ├── opensearch-pvc
│   │   └── prometheus-pvc
│   │
│   └── HorizontalPodAutoscaler:
│       ├── frontend-hpa (min: 3, max: 10)
│       ├── catalog-service-hpa (min: 3, max: 8)
│       ├── inventory-service-hpa (min: 3, max: 8)
│       ├── orders-service-hpa (min: 3, max: 8)
│       └── care-reminders-service-hpa (min: 3, max: 8)
│
└── monitoring (optional separate namespace)
    ├── prometheus
    ├── grafana
    └── alerting
```

---

## 🔒 Security & Compliance Features

### Implemented by Infrastructure

| Component | Security Feature |
|-----------|-----------------|
| **VPC** | Network isolation, private subnets |
| **IAM** | RBAC, principle of least privilege |
| **EKS** | Pod security policies, network policies |
| **ECR** | Private repositories, image scanning |
| **RDS/MySQL** | Encryption at rest, backups |
| **S3** | Server-side encryption, versioning |
| **CloudTrail** | Audit logs of all API calls |
| **Secrets Manager** | Encrypted credential storage |
| **TLS/SSL** | HTTPS certificates via ACM |
| **WAF** | Optional WAF rules on ALB |

---

## 📈 Auto-Scaling Strategy

### Horizontal Pod Autoscaling (HPA)
```
- Frontend: Scale 3-10 replicas based on CPU (70%) & Memory (80%)
- Services: Scale 3-8 replicas based on request count
- Trigggers on high traffic automatically
```

### Node Auto-Scaling (Cluster Autoscaler)
```
- Add nodes when pods can't be scheduled
- Remove nodes when underutilized
- Min: 3 nodes, Max: 10 nodes
- Instance type: t3.medium or larger
```

---

## 🔄 Deployment Workflow Example

### Step-by-Step: Deploying New Feature

1. **Developer pushes code to `main` branch**
   ```bash
   git push origin main
   ```

2. **GitHub webhook triggers Jenkins**
   - Jenkins pulls latest code
   - Runs npm install, npm build, npm test

3. **Jenkins builds Docker images**
   ```bash
   docker build -t paradise-plants/frontend:v1.2.3 .
   docker build -t paradise-plants/catalog-service:v1.2.3 .
   # ... 4 more services
   ```

4. **Jenkins tags and pushes to ECR**
   ```bash
   docker tag ... 123456789.dkr.ecr.us-east-1.amazonaws.com/...
   docker push ...
   ```

5. **Jenkins updates Helm values**
   ```yaml
   # helm/values.yaml
   image:
     tag: v1.2.3
   ```

6. **Jenkins commits & pushes to Git**
   - ArgoCD detects change

7. **ArgoCD syncs to EKS**
   - Creates rolling update
   - New pods on new images
   - Old pods terminate gracefully

8. **Traffic gradually shifts**
   - Service load balances to healthy pods
   - No downtime

9. **Monitoring & Logging**
   - Grafana shows metrics
   - OpenSearch logs appearing
   - CloudWatch logs EKS events

---

## 📞 Monitoring & Alerting

### Dashboards in Grafana
- Cluster Overview (CPU, Memory, Network)
- Pod Performance (per service)
- Application Metrics (requests, latency)
- Error Rates & Logs

### Alerts (Prometheus)
- Pod restart rate > 3 in 5 min
- CPU usage > 90%
- Memory usage > 85%
- Service unavailable
- High error rate (> 5%)

### Log Aggregation (OpenSearch)
- All container logs
- Full-text search
- Real-time dashboards
- Historical data retention

---

## 🚨 Disaster Recovery

### Backup Strategy
- **EBS Snapshots**: Automatic daily snapshots
- **RDS Backups**: 30-day retention
- **MySQL Backups**: Daily to S3
- **ArgoCD State**: Git is source of truth
- **Application State**: Persistent Volumes with snapshots

### Failover
- **Multi-AZ EKS**: Nodes/pods auto-failover
- **RDS Multi-AZ**: Automatic failover
- **S3 Versioning**: Recover previous versions

---

## 📋 Checklist for Production

- [ ] Terraform infrastructure created and tested
- [ ] ECR repositories created for all 5 images
- [ ] Jenkins pipeline configured and working
- [ ] ArgoCD installed and configured
- [ ] Helm charts created and tested
- [ ] HTTPS certificates from ACM
- [ ] CloudWatch & CloudTrail enabled
- [ ] OpenSearch cluster and kibana setup
- [ ] Prometheus and Grafana dashboards created
- [ ] Monitoring alerts configured
- [ ] Backup policies defined
- [ ] Disaster recovery plan documented
- [ ] Security policies reviewed
- [ ] Load testing completed
- [ ] Database backups scheduled
- [ ] Runbooks created for on-call team

---

## Next Steps

1. Review **1-ARCHITECTURE.md** for application structure
2. Follow **3-INSTALLATION_GUIDE.md** to set up tools
3. Start with Terraform to create infrastructure
4. Set up Docker and push examples to ECR
5. Configure Jenkins and ArgoCD
6. Test the full pipeline with a small feature
