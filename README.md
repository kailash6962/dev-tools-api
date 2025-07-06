# 🧾 InvoiceApp Server

A powerful backend service for managing invoices, authentication, sessions, and file validation — using Express, MySQL, Knex, Redis, and more. Built with scalability and clean architecture in mind.

---

## 🚀 Tech Stack

| Layer        | Technology                       |
|--------------|----------------------------------|
| Runtime      | Node.js v20.11.1                 |
| Framework    | Express                          |
| Database     | MySQL with Knex.js               |
| Auth & Session| Redis + connect-redis           |
| Validation   | validatorjs                      |
| Dev Tools    | dotenv, morgan, body-parser      |
| Deployment   | PM2 + ecosystem.config.js        |

---

## 📦 Features

- ✅ Clean MVC structure with **class-based controllers**
- 📁 **Knex.js** based migrations and seedings
- 🔐 **Redis session** management via `connect-redis`  
- 🧪 Request **validator** integrated into controllers
- ⚙️ Environment-specific error handling
- 🚦 `httpStatus` utility for consistent API responses
- 🧾 Supports raw JSON API payloads
- 🛠️ PM2-compatible deployment workflow

---

## 🧩 Modules Included

### 🔧 Config

- MySQL DB connection via `knexfile.js`
- Environment variables via `.env`

### 🧠 Controllers

- Organized as **classes**
- Built-in validation using `validatorjs`

### 🗃️ Database

- Folder contains all `migrations/` and `seeders/`
- Easily extendable using Knex CLI

### 🔀 Routes

- RESTful endpoints defined in `routes/`
- Controllers are imported and modularized

### 🛠️ Utils

- `httpStatus.js` for sending standardized JSON responses
- `common.js` holds shared validator logic and helpers

---

## 📡 Request Data Type

- Accepts `application/json` via **raw JSON** in request body

---

## ✨ Noteworthy Features

| Feature                          | Status         |
|----------------------------------|----------------|
| Dev-only error detail response   | ✅ Enabled      |
| Redis session support            | 🆕 New          |
| Knex migrations & seeders        | ✅ Available    |
| Express route-controller mapping | ✅ Implemented  |

> Redis session requires `.env` entries:  
```env
APP_NAME=InvoiceApp
APP_SECRET=your_very_secret_key
📦 Packages Used
Package	Description
express	HTTP framework
body-parser	Parses incoming request bodies
morgan	Request logging
dotenv	Environment variable management
fs	File system access
validatorjs	Lightweight validation lib
knex	SQL query builder
mysql2	MySQL client
connect-redis	Redis-backed session storage 🆕
redis	Redis client for Node.js 🆕
```

## 📁 Folder Structure
```
invoiceappserver/
├── config/             # Knex & Redis config
├── controllers/        # Class-based request handlers
├── database/
│   ├── migrations/     # SQL schema changes
│   └── seeders/        # Initial test data
├── middlewares/        # Session, auth, etc.
├── models/             # DB layer (if applicable)
├── routes/             # All API route handlers
├── utils/              # httpStatus, validators, etc.
├── uploads/            # File uploads
├── .env                # Environment config
├── server.js           # Entry point
└── ecosystem.config.js # PM2 deployment script
```
## ⚙️ Setup & Installation

### 1. Clone the repo
```
git clone https://github.com/kailash6962/invoiceappserver.git
cd invoiceappserver
```
### 2. Install dependencies
```
npm install
```
### 3. Configure your .env
```
cp .env.example .env
```
### 4. Run migrations & seeds
```
npx knex migrate:latest
npx knex seed:run
```
### 5. Start dev server
```
npm start
```
### 🧪 Environment Example
```
PORT=8000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=invoice_db
DB_USER=root
DB_PASS=rootpass

APP_NAME=InvoiceApp
APP_SECRET=supersecret

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

🚀 Deployment (Production)
This project supports zero-downtime deployment via PM2:
```
pm2 start ecosystem.config.js
```
Make sure your ecosystem.config.js has the correct SSH & server info.

📄 License
This project is licensed under the ISC License.

🙌 Author
Kailash K — GitHub

