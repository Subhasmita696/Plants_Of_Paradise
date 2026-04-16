# Paradise Plants - Tools Installation

## Purpose

This document lists the tools and packages needed to develop, build, scan, and deploy the Paradise Plants project.

## Required tools

### 1. Docker

Used to build container images for frontend and backend.

macOS:
```bash
brew install --cask docker
open /Applications/Docker.app
```

Linux:
```bash
sudo apt-get update
sudo apt-get install -y docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```

Verify:
```bash
docker --version
docker run hello-world
```

### 2. Trivy

Used for scanning code directories and Docker images for vulnerabilities.

macOS:
```bash
brew install aquasecurity/trivy/trivy
```

Linux:
```bash
sudo apt-get update
sudo apt-get install -y wget apt-transport-https gnupg lsb-release
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee /etc/apt/sources.list.d/trivy.list
sudo apt-get update
sudo apt-get install -y trivy
```

Verify:
```bash
trivy --version
```

### 3. Helm

Used to package and deploy the Kubernetes application.

macOS:
```bash
brew install helm
```

Linux:
```bash
curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

Verify:
```bash
helm version
```

### 4. ArgoCD

Used for GitOps deployment to AKS.

Install CLI:
```bash
brew install argocd
```

Install ArgoCD in Kubernetes:
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Access:
```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

### 5. Prometheus and Grafana

Used for monitoring and visualization.

Install Prometheus:
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack -n monitoring --create-namespace
```

Install Grafana:
```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm install grafana grafana/grafana -n monitoring --create-namespace
```

### 6. SonarQube (optional)

Used for code quality and static analysis.

Run with Docker:
```bash
docker pull sonarqube:latest
docker run -d --name sonarqube -p 9000:9000 sonarqube:latest
```

Access:
- `http://localhost:9000`
- Default login: `admin` / `admin`

### 7. Azure CLI

Used to manage Azure resources and AKS.

macOS:
```bash
brew install azure-cli
```

Linux:
```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

Verify:
```bash
az --version
```

### 8. kubectl

Used to manage the Kubernetes cluster.

macOS:
```bash
brew install kubectl
```

Linux:
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

Verify:
```bash
kubectl version --client
```

## Packages used in this project

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui
- React Router
- React Query

### Backend
- Node.js
- Express
- MySQL2
- CORS
- dotenv
- Axios

### DevOps / CI
- Terraform
- Helm
- ArgoCD
- Prometheus
- Grafana
- Trivy
- Docker
- Azure DevOps
