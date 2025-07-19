# 🛒 E-Commerce Platform (MERN Stack)

![React](https://img.shields.io/badge/Frontend-React-blue) ![Tailwind](https://img.shields.io/badge/Styling-TailwindCSS-38b2ac) ![Node.js](https://img.shields.io/badge/Runtime-Node.js-green) ![Express.js](https://img.shields.io/badge/Backend-Express.js-lightgrey) ![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen) ![Razorpay](https://img.shields.io/badge/Payments-Razorpay-purple) ![JWT](https://img.shields.io/badge/Auth-JWT-orange) ![Bcrypt](https://img.shields.io/badge/Security-Bcrypt-yellowgreen) ![Render](https://img.shields.io/badge/Hosted_on-Render-blueviolet) ![Axios](https://img.shields.io/badge/Client-Axios-5A29E4) ![Vercel](https://img.shields.io/badge/Hosted_on-Vercel-black) ![Toastify](https://img.shields.io/badge/UI-Toastify-ffb347) ![Made With Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)

A full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js). The platform supports two user types — Customers and Admins — and provides essential features for online shopping and product management.

## 📚 Table of Contents

- [Demo](##-Demo)
- [Tech Stack](##-Tech-Stack)
- [Features](##-Features)
- [Run Locally](##-Run-Locally)
- [Folder Structure](####-folder-structure)
- [Screen Shots](##-Screenshots)

## Demo

Insert gif or link to demo

## Tech Stack

**Client:** React, Tailwind CSS, Axios, Toastify

**Server:** Node.js, Express.js, MongoDB, Mongoose

**Authentication:** JWT, Bcrypt

**Payments:** Razorpay, COD

## Features

- User Authentication & Authorization (JWT-based)
- Product Browsing with filtering
- Shopping Cart & Checkout Flow
- Order Placement with Cash on Delivery and Razorpay payment options (Stripe integration pending)
- Admin Dashboard to manage Products Inventory and Orders
- Responsive UI using Tailwind CSS
- Secure password hashing with Bcrypt

## Run Locally

#### 📁 Project Structure:

- /frontend – React app
- /backend – Express API + MongoDB
- /admin – Admin dashboard

clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies fontend backend and admin

```bash
  cd frontend && npm install
  cd ../backend && npm install
  cd ../admin && npm install

```

Start the backend server

```bash
  //run these in root directory
  cd backend
  npm run start
```

Start the frontend App

```bash
  //run these in root directory
  cd frontend
  npm run dev
```

Start the Admin App

```bash
  //run these in root directory
  cd admin
  npm run
```

Admin credentials

```bash
  //for logging in as admin , please dont delete any entries
  ADMIN_EMAIL = 'sahilAdmin@gmail.com'
  ADMIN_PASSWORD = 'sahilAdmin123'
  npm run dev
```

Your are good to go!!

## Screenshots

![Frontend Screenshot](/docs/ss_frontend1.png)
![Frontend Screenshot](/docs/ss_frontend2.png)
![Frontend Screenshot](/docs/ss_frontend3.png)
![Frontend Screenshot](/docs/ss_frontend4.png)
![Frontend Screenshot](/docs/ss_frontend5.png)
![Frontend Screenshot](/docs/ss_frontend6.png)
![Frontend Screenshot](/docs/ss_frontend7.png)

![Admin Screenshot](/docs/ss_admin1.png)
![Admin Screenshot](/docs/ss_admin2.png)
![Admin Screenshot](/docs/ss_admin3.png)
![Admin Screenshot](/docs/ss_admin4.png)
