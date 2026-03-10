# Business Invoice Management System - Project Report

## Introduction
The **Business Invoice Management System** is a full-stack SaaS-style web application developed for businesses to manage their client lists, track revenue accurately, and generate automated PDF invoices securely. 

This project was built iteratively using a robust **MERN-like stack**, utilizing **Next.js** for a sleek, component-driven frontend and **Express (Node.js)** for a performant stateless REST backend. It also utilizes **NeDB**, an integrated flat-file local storage system optimized for simple deployment, allowing data manipulation without requiring external cloud databases or background services.

---

## 🏗️ Technology Stack

### Frontend Architecture
- **Framework:** Next.js 14 (Pages Router) configured with TypeScript for type-safety.
- **Styling:** Tailwind CSS (utility-first styling).
- **Component Library:** Shadcn UI (Radix UI wrappers for fully accessible pre-built modular components such as Tables, Badges, and Dialogs).
- **HTTP Client:** Axios with custom interceptors to automatically weave Authorization Tokens into outgoing requests.
- **Visuals:** Recharts for dynamic dashboard analytics processing, and `lucide-react` for iconography.
- **PDF Generation:** `jsPDF` integrated with `jspdf-autotable` to format and print raw application payloads into customized, downloadable business invoices.

### Backend Architecture
- **Framework:** Express.js on Node.js.
- **Database:** NeDB (Local pure-JavaScript document database utilizing MongoDB's query syntax).
- **Authentication:** JSON Web Tokens (JWT) for secure, stateless session tracking over a REST API.
- **Security:** `bcryptjs` used to irreversibly hash and encrypt administrative passwords inside the local database environment.

---

## 📋 Comprehensive Workflow & Features

The system follows a strict Role-Based Access Control (RBAC) model. The typical system flow runs chronologically as follows:

### 1. Authentication & Roles
- **Registration/Login:** The user must register an account (via `/login` or `/register`). The backend intercepts the payload, hashes the password via `bcrypt`, and mints a unique signed `JWT`.
- **Session:** The frontend saves the returned profile and JWT into the browser's `localStorage`. All subsequent Axios requests attach this credential (`Bearer {token}`) as proof of identity to access protected routes.

### 2. Dashboard Analytics (`/dashboard`)
Upon login, users land on the Analytics Dashboard.
- **Overview Metrics:** The backend processes aggregation arrays across NeDB collections to tally total Customers, Pending Payments waiting to be collected, and Lifetime Paid Revenue.
- **Recharts Integration:** Historical monthly revenue data is translated onto a Bar Chart visualization for quick corporate analysis.

### 3. Customer Management (`/customers`)
Before an invoice can be billed, the system requires an entity to bill it to.
- **Records:** Admins navigate to the customer portal and create entries detailing a business's specific Address, Email, Phone, and Tax (GST) Numbers.
- **Storage:** Entries are persisted into the [backend/data/customers.db](file:///f:/college%20projects/businessmanagementystem/backend/data/customers.db) JSON storage cluster.

### 4. Dynamic Invoice Generation (`/invoices/create`)
The cornerstone of the application—this module allows a business to dynamically construct a bill.
- **Form Interactivity:** Users can click "Add Item" to spawn new array elements inside the invoice form. The React state instantly maps quantity vs unit price to auto-calculate the **Subtotal**, **Tax (%)**, and **Grand Total** before the user even clicks submit.
- **Draft Status:** Upon submission, an invoice starts with a default "Draft" status.

### 5. Finalizing Invoices (`/invoices/[id]`)
Once generated, the user enters the Invoice Details view.
- **Download PDF Generation:** Clicking "Download" triggers `jsPDF`. The frontend parses the `totalAmount` and `items[]` array natively, draws the elements onto a hidden PDF frame (including Company specifics and auto-tables), and forces a local browser download (`INV-XXXX.pdf`).
- **Simulated Email:** Clicking "Send Invoice" triggers a backend sequence simulated to represent a `Nodemailer` integration—updating the Invoice's tag visually to "Sent" via a Shadcn badge.

### 6. Payment Processing (`/payments`)
- **Simulated Transactions:** Instead of querying an external Stripe/Razorpay SDK environment, clicking "Mark as Paid" sends an API execution directly to `/api/payments`. 
- **Database Relations:** A new, immutable Payment history receipt is logged in the DB. Simultaneously, the backend finds the original associated Invoice in `invoices.db` and immediately updates its status securely from "Draft/Sent" to "Paid", completing the business pipeline loop.

---

## 🗂️ Project Directory Structure

```text
businessmanagementystem/
│
├── backend/                       # Express Node API
│   ├── data/                      # 📁 NeDB Local Storage Collections (*.db)
│   ├── config/
│   │   └── db.js                  # NeDB initialization script
│   ├── controllers/               # Business Logic
│   │   ├── analyticsController.js # Tally aggregations
│   │   ├── authController.js      # Register/Login
│   │   ├── customerController.js  # CRUD operations
│   │   ├── invoiceController.js   # Invoice generation
│   │   └── paymentController.js   # Simulated Payments
│   ├── middleware/
│   │   └── authMiddleware.js      # Protects routes requiring valid JWTs
│   ├── routes/                    # API Route definitions
│   └── server.js                  # Entry point (port 5000)
│
├── frontend/                      # Next.js Application
│   ├── components/
│   │   ├── ui/                    # 📁 Shadcn injected local components (Buttons, inputs)
│   │   ├── Layout.tsx             # Wrapper to display Navbar/Sidebar globally
│   │   ├── Navbar.tsx             # Top header showing Active User
│   │   └── Sidebar.tsx            # Left site directory navigation (Lucide icons)
│   ├── lib/
│   │   └── utils.ts               # Tailwind-merge script for Shadcn components
│   ├── pages/                     # React Routes
│   │   ├── auth/                  # Login and Register
│   │   ├── analytics/             # Route formatting
│   │   ├── customers/             # Customer directory UI
│   │   ├── dashboard/             # Overview charts via Recharts
│   │   ├── invoices/              # Form generators and PDF exporters
│   │   ├── payments/              # Payment tracking history views
│   │   └── settings/              # Settings & GST configurations
│   ├── utils/
│   │   └── axios.ts               # Centralized Axios configs holding JWT Interceptors
│   └── components.json            # Shadcn environment map
```

## Summary
The system provides a lightweight, local-storage equivalent of enterprise tools like Quickbooks or Zoho Invoice. By utilizing React Hook Forms, NeDB JSON datastores, and an Express router, this complete application stack operates smoothly from memory on a local machine while demonstrating strong production-level principles including security, state synchronization, PDF generation, and aesthetic design methodologies.
