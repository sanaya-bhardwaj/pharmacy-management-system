# Pharmacy Management System

A Full-Stack Pharmacy Management System built using React (Frontend) and FastAPI (Backend).  
This system helps manage medicines, track stock, record purchases, and record sales efficiently.

---

## 📌 Project Overview

The Pharmacy Management System allows pharmacy owners to:

- View all available medicines
- Monitor stock levels
- Record purchases from suppliers
- Record sales transactions
- Automatically update inventory
- Highlight low stock medicines

The project is fully deployed in production.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- HTML/CSS

### Backend
- FastAPI
- Python
- SQLAlchemy

### Database
- MySQL

### Deployment
- Frontend: Vercel
- Backend: Render
- Version Control: GitHub

---

## 🔎 Technical Explanation – REST API Structure

The backend of the Pharmacy Management System is built using FastAPI and follows RESTful API principles.

The system exposes multiple endpoints to handle CRUD operations for medicines, purchases, and sales.

---

### 📌 Base URL

Local Development:
http://127.0.0.1:8000

Production (Render):
https://pharmacy-backend-2uuo.onrender.com

---

## 📦 API Endpoints

### 1️⃣ Medicines

GET /medicines  
Description: Fetch all available medicines from the database.

Response:
[
  {
    "id": 1,
    "name": "Paracetamol",
    "stock": 50,
    "price": 20.0
  }
]

Purpose:
- Display inventory
- Show medicine dropdown in Sales & Purchases
- Monitor stock levels

---

### 2️⃣ Purchases

GET /purchases  
Description: Fetch all purchase records.

POST /purchases  
Description: Add a new purchase record.

Request Body:
{
  "medicine_id": 1,
  "quantity": 20,
  "supplier": "ABC Pharma",
  "cost": 300.0
}

Logic:
- Adds a purchase entry
- Automatically increases the stock of the selected medicine

---

### 3️⃣ Sales

GET /sales  
Description: Fetch all sales records.

POST /sales  
Description: Record a new sale transaction.

Request Body:
{
  "medicine_id": 1,
  "invoice": "INV001",
  "amount": 100.0
}

Logic:
- Adds a sales entry
- Automatically decreases the stock of the selected medicine

---

## 🔄 API Workflow

1. Frontend sends HTTP request using Axios.
2. FastAPI receives request.
3. SQLAlchemy interacts with MySQL database.
4. Database updates or fetches records.
5. Response is returned in JSON format.
6. React frontend updates UI dynamically.

---

## 🧠 REST Principles Followed

- Uses HTTP methods (GET, POST)
- Stateless communication
- JSON request & response format
- Clear endpoint naming
- Separation of concerns (Frontend & Backend independent)

---

## 🔐 CORS Handling

CORS middleware is configured in FastAPI to allow frontend requests from:
- http://localhost:3000 (development)
- Vercel production domain

---

## 🏗 Architecture Summary

React (Frontend)  
        ↓ HTTP Requests  
FastAPI (Backend)  
        ↓  
SQLAlchemy  
        ↓  
MySQL Database  

---

This REST-based architecture ensures scalability, modularity, and maintainability of the system.

---

## 🌍 Live Deployment

https://pharmacy-management-system-jxcq.vercel.app/

---


## 📊 Features

- Dashboard Overview
- Inventory Management
- Add Purchases
- Record Sales
- Automatic Stock Update
- Low Stock Highlight
- Full Production Deployment

---

## 🧠 Learning Outcomes

- Building REST APIs using FastAPI
- Connecting React frontend with backend APIs
- Managing environment variables
- Full-stack deployment (Render + Vercel)
- Git & GitHub workflow

---

## 📌 Future Improvements

- User Authentication
- Role-based access (Admin / Staff)
- Invoice PDF generation
- Advanced analytics dashboard
- Search and filter functionality

---

## 👩‍💻 Author

Sanaya Bhardwaj  

