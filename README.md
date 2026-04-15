# Simple Full-Stack Containerized Application (Docker + Kubernetes + AWS)

## Overview

This project demonstrates a **basic full-stack application deployment workflow** using modern DevOps tools.
It includes:

* **Frontend:** HTML, CSS, JavaScript served via Nginx
* **Backend:** Node.js + Express REST API
* **Containerization:** Docker
* **Container Registry:** AWS ECR
* **Orchestration:** Kubernetes
* **Deployment:** Kubernetes Deployments and Services

The goal of this project is to understand the **complete cloud-native workflow**, starting from building a simple application to deploying it using **containers and Kubernetes**.

---

# Architecture

```
Browser
   │
   ▼
Frontend (Nginx Container)
   │
   ▼
Backend Service (ClusterIP)
   │
   ▼
Backend Pod (Node.js + Express API)
```

In a cloud deployment environment:

```
Internet
   │
   ▼
Load Balancer
   │
   ▼
Frontend Service
   │
   ▼
Frontend Pods
   │
   ▼
Backend Service
   │
   ▼
Backend Pods
```

---

# Project Structure

```
simple-fullstack-app
│
├── frontend
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── Dockerfile
│
├── backend
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
│
└── k8s
    ├── backend-deployment.yaml
    ├── backend-service.yaml
    ├── frontend-deployment.yaml
    └── frontend-service.yaml
```

---

# Application Features

* Simple **Task Manager**
* Add tasks
* Fetch tasks from backend API
* Demonstrates **frontend ↔ backend communication**

Backend API endpoint:

```
GET /tasks
POST /tasks
```

---

# Prerequisites

Before running this project, install the following tools:

* Docker
* Kubernetes (Docker Desktop / Minikube)
* kubectl
* AWS CLI
* AWS account

---

# Running the Application Locally

## Run Backend

```
cd backend
npm install
node server.js
```

Backend runs on:

```
http://localhost:5000
```

Test API:

```
http://localhost:5000/tasks
```

---

## Run Frontend

Open the frontend file:

```
frontend/index.html
```

The frontend will communicate with the backend API.

---

# Docker Setup

## Build Backend Image

```
docker build -t taskpep-backend ./backend
```

## Build Frontend Image

```
docker build -t taskpep-frontend ./frontend
```

Check images:

```
docker images
```

---

# Running Containers Using Docker Compose

Start both frontend and backend containers:

```
docker compose up --build
```

Access application:

```
Frontend → http://localhost:3000
Backend → http://localhost:5000/tasks
```

---

# AWS ECR (Container Registry)

Create repositories in AWS ECR:

```
taskpep-backend
taskpep-frontend
```

Login to ECR:

```
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-south-1.amazonaws.com
```

Tag images:

```
docker tag taskpep-backend:latest <account-id>.dkr.ecr.ap-south-1.amazonaws.com/taskpep-backend
docker tag taskpep-frontend:latest <account-id>.dkr.ecr.ap-south-1.amazonaws.com/taskpep-frontend
```

Push images:

```
docker push <account-id>.dkr.ecr.ap-south-1.amazonaws.com/taskpep-backend
docker push <account-id>.dkr.ecr.ap-south-1.amazonaws.com/taskpep-frontend
```

---

# Kubernetes Deployment

## Apply Kubernetes Configurations

```
kubectl apply -f k8s/
```

---

## Verify Pods

```
kubectl get pods
```

Expected output:

```
backend-deployment-xxxx
frontend-deployment-xxxx
```

---

## Verify Services

```
kubectl get services
```

Example output:

```
backend-service    ClusterIP
frontend-service   LoadBalancer
```

---

# Access Application

If running locally:

```
http://localhost:<nodeport>
```

If running in cloud:

```
http://<load-balancer-ip>
```

---

# Kubernetes Resources Used

### Deployment

Manages:

* Pod creation
* Scaling
* Rolling updates

Used for:

```
backend-deployment
frontend-deployment
```

### Service

Provides network access to pods.

Types used:

```
ClusterIP   → internal communication
LoadBalancer → public access
```

---

# Frontend → Backend Communication

The frontend connects to backend using Kubernetes service DNS:

```
http://backend-service:5000
```

Kubernetes automatically resolves service names.

---

# Scaling the Application

Increase replicas:

```
kubectl scale deployment backend-deployment --replicas=4
```

---

# Future Improvements

Possible enhancements:

* Add MongoDB / DynamoDB database
* Use Kubernetes Ingress
* Configure Route53 domain
* Implement CI/CD pipeline
* Add monitoring (Prometheus + Grafana)

---

# DevOps Concepts Demonstrated

This project demonstrates:

* Containerization
* Microservice architecture
* Docker image creation
* Container registry (AWS ECR)
* Kubernetes deployments
* Service discovery
* Load balancing

---

# Author

Sam Raj
Computer Science Engineering Student
Cloud & DevOps Enthusiast
