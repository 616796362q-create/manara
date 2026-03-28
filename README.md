# 🏢 Manara Plaza - Full-Stack Web Platform

A premium, modern web platform for Manara Plaza, including 5 key services: Hotel, Restaurant, Cafe, Event Halls, and Shop.

## 🚀 Technology Stack
- **Frontend:** React.js + Tailwind CSS + Framer Motion
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **UI/UX:** Premium Design with Dark Green & Golden Bronze palette

## ✨ Key Features
- **Booking System:** Interactive booking for Hotel Rooms and Event Halls.
- **Digital Menu:** Full-featured menu for Restaurant and Cafe with a dynamic cart.
- **Product Grid:** Elegant shop display for premium products.
- **WhatsApp Checkout:** Formatted order/booking summaries sent directly to admin for effortless processing.
- **Responsive Design:** Optimized for Mobile, Tablet, and Desktop.

## 🛠️ Setup & Installation

### 1. Prerequisites
- Node.js (v16.x or later)
- MongoDB installed and running locally

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
*Note: Make sure your MongoDB is running at `mongodb://localhost:27017/manara_plaza` or update the MONGODB_URI in `server.js`.*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*The app will be available at `http://localhost:5173`*

## 🎨 Design System
- **Dark Green:** `#1a2421` (Stability, Luxury)
- **Golden Bronze:** `#b8860b` (Prestige, Quality)
- **Glassmorphism & Micro-animations** for a premium feel.

## 📂 Project Structure
- `/backend`: Express.js API, Mongoose Models, and Orders logic.
- `/frontend`:
  - `src/components`: Shared UI components (Navbar, Footer, Hero).
  - `src/pages`: Individual pages for each service and Admin Dashboard.
  - `src/data`: Centralized data management.
  - `src/App.jsx`: Routing and Global State.
