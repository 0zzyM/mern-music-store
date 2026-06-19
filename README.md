# 🎸 MERN Music Store

A full-stack music store application built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js).

This project was created as a learning exercise to understand how to build a complete full-stack application, including frontend development, REST API design, backend architecture, and MongoDB data modelling.

The focus of this project was not only building features, but understanding how different parts of a modern web application work together and how minor architectural desicions can create a big difference.

## 📦 Technologies

### Frontend

- `React.js`
- `Vite`
- `React Router`
- `Native CSS`

### Backend

- `Node.js`
- `Express.js`
- `MongoDB`
- `Mongoose`

### Tools

- `Git`
- `npm`
- `Postman`

---

# ✨ Features

Currently implemented:

- Browse musical instruments and products
- View individual product details
- Product categories and subcategories
- Brand organisation
- Product search API
- Product promotions
- Responsive React interface
- REST API with versioned routes

Example API structure:

```
/api/v1/products
/api/v1/categories
/api/v1/subcategories
/api/v1/brands
/api/v1/promotions
/api/v1/search
```

Upcoming features:

- Shopping cart
- Deployment
- Centralised error handling middleware
- User authentication
- JWT authentication
- Protected routes
- Orders
- Admin dashboard

---

# 🏗️ The Architecture

The application follows a client-server architecture.

```
                 React Client
                      |
                      |
                  REST API
                      |
                      |
               Express Server
                      |
                      |
                  MongoDB
```

The responsibility of each layer is separated:

### React Client

- Rendering the user interface
- Handling user interaction
- Managing navigation

### Express Server

- API routing
- Business logic
- Communicating with the database

### MongoDB

- Data storage

---

# 🧩 Architectural Decisions

## MongoDB Document Design

One of the main challenges was modelling different types of musical products.

For example, guitars, keyboards, and audio equipment can have completely different specifications.

Instead of creating separate schemas for every product type, the product model uses a flexible details field:

```javascript
details: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
}
```

Example:

```json
{
  "bodyMaterial": "Alder",
  "bodyFinish": "Matte",
  "neckConstruction": "Neck-Through Body",
  "countryOfOrigin": "USA"
}
```

### Why?

This allows different categories to store different specifications without constantly changing the database schema.

### Trade-off

The flexibility comes with less strict validation.
A future improvement would be introducing category-specific schemas or validation rules.

---

# Backend Structure

The backend follows a layered structure:

```
server/

├── controllers/
│
├── models/
│
├── routers/
│
├── config/
│
└── scripts/
```

## Models

Responsible for:

- MongoDB schemas
- Data relationships

Example relationships:

```
Product
   |
   ├── Brand
   |
   ├── Category
   |
   └── Subcategory
```

## Controllers

Responsible for:

- Handling requests
- Executing application logic
- Returning responses

## Routers

Responsible for:

- Defining API endpoints
- Connecting routes to controllers

## Config

Responsible for:

- Database connection
- Application configuration

---

# REST API Design

The API follows REST conventions.

Example:

```
GET    /api/v1/products
GET    /api/v1/products/:id
POST   /api/v1/products
PUT    /api/v1/products/:id
DELETE /api/v1/products/:id
```

The API uses versioning:

```
/api/v1/
```

This allows future changes without breaking existing clients.

---

# 🔐 Authentication (Planned)

Authentication is not implemented yet.

The planned approach is JWT-based authentication.

Future flow:

```
User Login
     |
Validate Credentials
     |
Generate JWT
     |
Client Stores Token
     |
Protected Requests
```

---

# ⚠️ Error Handling (Planned)

Currently, error handling is handled inside individual controllers.

A future improvement is introducing centralised Express middleware.

Planned flow:

```
Request
   |
Controller
   |
Error Occurs
   |
Error Middleware
   |
Standard Response
```

Benefits:

- Cleaner controllers
- Consistent API responses
- Easier debugging

---

# 🧠 What I Learned

_TO BE ADDED LATER_

---

## MongoDB Data Modelling

One of the biggest challenges was deciding how to represent different musical products.

A guitar, keyboard, and audio interface all have different specifications.

Instead of creating a separate schema for every product type, I experimented with flexible product details:

```javascript
details: {
  type: mongoose.Schema.Types.Mixed;
}
```

---

## Project Structure

Separating the frontend and backend made the application easier to reason about.

The client focuses on presentation while the server handles data and business logic.

---

# 💭 How Can It Be Improved?

_TO BE ADDED LATER_

---

# 🚦 Running the Project

_TO BE ADDED LATER_

---

# 🍿 Video

_TO BE ADDED LATER_

---

# About

🎸 MERN Music Store built as a full-stack learning and portfolio project.

## Author

Oguzhan Acar

GitHub:
https://github.com/0zzyM
