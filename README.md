💼 Business Invoice Management System
📌 Description

The Business Invoice Management System is a full-stack, SaaS-style web application designed to automate and simplify the complete invoicing workflow for small and medium businesses.

It replaces traditional methods like spreadsheets and paper billing with a centralized, secure, and efficient system for managing invoices, customers, payments, and financial analytics.

🎯 Problem Statement

Many businesses face issues like:

❌ Billing errors
⏳ Delayed payments
📉 Poor financial tracking
📄 Scattered invoice records

This system solves these problems by providing a single platform for billing and analytics.

🚀 Features
🔐 JWT-based Authentication & Role-Based Access (Admin, Accountant)
👥 Customer Management (CRUD operations)
🧾 Invoice Creation with dynamic line items
💰 Payment Tracking & Status Updates
📊 Dashboard with Revenue Analytics (charts & stats)
📄 PDF Invoice Generation (client-side using jsPDF)
📧 Simulated Email & Payment Integration
🏗️ Architecture

The system follows a 3-tier architecture:

Frontend: Next.js + TypeScript + Tailwind CSS
Backend: Node.js + Express.js (REST API)
Database: NeDB (lightweight, file-based DB)

➡️ As shown in the architecture diagram (page 26), the frontend communicates with backend APIs, and the backend handles all business logic and data storage.

🛠️ Tech Stack
Frontend: Next.js, TypeScript, Tailwind CSS
Backend: Node.js, Express.js
Database: NeDB
Authentication: JWT, Bcrypt
Charts: Recharts
PDF Generation: jsPDF
🔄 Workflow
User registers/login (JWT authentication)
Add and manage customers
Create invoices with multiple items
System calculates subtotal, tax, total automatically
Send invoice → Track status (Draft → Sent → Paid)
Record payments → Dashboard updates
Generate downloadable PDF invoice
📊 Key Modules
🔐 Authentication Module
👤 Customer Module
🧾 Invoice Module
💳 Payment Module
📈 Dashboard Analytics
📄 PDF Generator
🔐 Security Features
Password hashing using bcrypt
Token-based authentication using JWT
Role-Based Access Control (RBAC)
Input validation & secure API handling
📦 Installation
git clone https://github.com/your-username/invoice-management-system.git
cd invoice-management-system

# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
🌐 Usage
Frontend: http://localhost:3000
Backend API: http://localhost:5000/api


🔮 Future Enhancements
💳 Real payment gateway integration (Stripe/Razorpay)
📧 Email service integration (SMTP)
☁️ Cloud database (MongoDB Atlas)
📱 Mobile app version
🌍 Multi-currency support
👨‍💻 Author

Kishore T S


<img width="2885" height="1479" alt="_settings" src="https://github.com/user-attachments/assets/65ab9b3a-dc78-4d3d-970f-6ef9d4384e01" />
<img width="2821" height="1111" alt="_register" src="https://github.com/user-attachments/assets/36de9156-7e49-40ea-bf45-891f2c5edd3b" />
<img width="2885" height="1479" alt="_payments" src="https://github.com/user-attachments/assets/01f9c887-52b1-4cd0-ad52-0dcd3897fa61" />
<img width="2453" height="681" alt="_login" src="https://github.com/user-attachments/assets/41af2111-5a1f-4cfd-9109-2b98efb0a872" />
<img width="2885" height="1479" alt="_invoices_create" src="https://github.com/user-attachments/assets/3e4e255c-0f9c-4641-9bb0-b830bdc7d148" />
<img width="2885" height="1479" alt="_invoices" src="https://github.com/user-attachments/assets/5a9675a9-da82-45fc-ba2b-928457c70258" />
<img width="2885" height="1479" alt="_dashboard" src="https://github.com/user-attachments/assets/3d33e8e2-e32d-46d4-af1c-ab21e178893c" />
<img width="2885" height="1479" alt="_customers_create" src="https://github.com/user-attachments/assets/bbca0021-4397-4cfc-a86a-e18f666addb0" />
<img width="2885" height="1479" alt="_customers" src="https://github.com/user-attachments/assets/b79e10be-6ea1-4aa2-a8e7-764730152592" />
<img width="2885" height="1479" alt="_analytics" src="https://github.com/user-attachments/assets/2d374fe2-2f14-4169-9c92-b3bb6349cd0e" />
<img width="2514" height="959" alt="_" src="https://github.com/user-attachments/assets/73bf13ef-14b0-443d-ba5c-a1a375a72ef0" />

