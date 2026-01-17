# 🏃 Athlete Performance Tracker (MVP)

A full-stack web application that allows a coach to manage athletes, record physical test results, and view a performance leaderboard.

This project is built as part of a technical assessment to demonstrate **CRUD operations, REST APIs, role-based access, and a React dashboard**.

---

## 🚀 Features

### 👤 Athletes
- Add new athletes
- Update athlete details
- Delete athletes (with related scores)
- View all athletes

### 📊 Test Scores
- Add physical test results (e.g., 30m Sprint, Vertical Jump)
- Scores linked to athletes using foreign keys
- Secure score creation (Coach only)

### 🏆 Leaderboard
- View athletes ranked by total performance score
- Aggregated scores from all tests

### 🔐 Role-Based Access
- **Coach** → Full CRUD access
- **Viewer** → Read-only access
- Role passed via request header

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Fetch API
- Basic responsive UI

### Backend
- Node.js
- Express.js
- SQLite
- REST API

---

## 📁 Project Structure
athlete-performance-tracker/
│
├── backend/
│ ├── routes/
│ │ ├── athletes.js
│ │ ├── scores.js
│ │ └── leaderboard.js
│ ├── middleware/
│ │ └── role.js
│ ├── db.js
│ ├── index.js
│ └── database.sqlite
│
├── frontend/
│ ├── src/
│ │ ├── App.jsx
│ │ ├── App.css
│ │ └── main.jsx
│ └── index.html
│
├── .gitignore
├── package.json
└── README.md

