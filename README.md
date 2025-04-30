# eatoes 🍽️

A full-stack mini restaurant ordering system built using the **MERN + PostgreSQL** stack. This app allows customers to browse a menu, add items to a cart, place pickup orders, and view their order history.

---

## 🌟 Features

- 📖 View categorized menu items
- 🛒 Add/remove items to/from the cart
- 🧾 Place an order with name and phone number (no payment integration)
- 👤 Sign up / login using phone number and password
- 📜 View past orders (login required)
- 🧠 JWT protected routes for secure access
- 🌐 Deployed frontend on Netlify
- 🧱 Dual database architecture: MongoDB + PostgreSQL

---

## 🗂️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (Menu), PostgreSQL (Users + Orders via Prisma ORM)
- **Authentication:** JWT + bcrypt
- **Deployment:** Netlify (Frontend), Railway (Backend)

---

## 📦 MongoDB vs PostgreSQL Design Rationale

| Data                 | Database     | Reason                                                                            |
|----------------------|--------------|-----------------------------------------------------------------------------------|
| Menu Items           | MongoDB      | Flexible schema for item variants and categories                                 |
| Users & Orders       | PostgreSQL   | Structured, relational data with strong typing using Prisma ORM                  |

---

## 🧪 API Endpoints

### 🧾 Menu (MongoDB)

- `GET /api/menu` — Get all menu items
- `GET /api/menu/:id` — Get single menu item by ID

### 👤 Auth (PostgreSQL)

- `POST /api/auth/signup` — Register with name, phone, password
- `POST /api/auth/signin` — Login with phone, password

### 🛍️ Orders (PostgreSQL)

- `POST /api/order` — Place a new order
  ```json
  {
    "name": "John Doe",
    "phone": "9876543210",
    "cartItems": [
      { "name": "Veg Biryani", "price": 249, "quantity": 1 },
      { "name": "Coke", "price": 50, "quantity": 2 }
    ]
  }
  ```

- `GET /api/order/history` — Get order history for a phone number (JWT protected)

---

## 🔐 Protected Routes

- `/api/orders/history` requires JWT token in `Authorization` header: `Bearer <token>`

---

<!-- ## 🚀 Deployment

- **Frontend:** [Netlify Deployed Link](https://your-netlify-link.netlify.app)
- **Backend:** Hosted on [Railway](https://your-railway-backend-url/api) -->

---

## 🛠️ Running Locally

### 1. Clone the repo
```bash
git clone https://github.com/your-username/digital-diner.git
cd eatoes
```

### 2. Setup Backend
```bash
cd backend
npm install

# Prisma setup
npx prisma migrate dev --name init
npx prisma generate

# Run server
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 💡 Assumptions & Notes

- Menu does not support dynamic pricing/variants for now.
- Login is required **only** for viewing order history.
- User creation is optional during order placement.

---

