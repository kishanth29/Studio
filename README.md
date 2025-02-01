# DS Creatios - MERN Stack Application

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Routes (Backend)](#api-routes-backend)
- [Project Structure](#project-structure)
- [Creator](#creator)
- [Contributors](#contributors)
- [License](#license)

---

## Overview

Kisan is a MERN (MongoDB, Express.js, React.js, Node.js) stack-based application. It includes a client built with React.js and a server developed using Node.js and Express.js. The application supports authentication, payment integrations (Stripe, PayPal, Razorpay), and more.

GitHub Repository: [Studio](git@github.com:kishanth29/Studio.git)

---

## Technologies Used

### Client:

- React.js
- Redux Toolkit
- React Router
- Bootstrap & MDB React UI Kit
- Axios
- Stripe & PayPal SDK
- PDF & File Handling Libraries (pdf-lib, file-saver, jszip)

### Server:

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Nodemailer
- Multer (for file uploads)
- Payment Integrations: Stripe, PayPal, Razorpay

---

## Installation

### Prerequisites:

- Node.js & npm installed
- MongoDB installed locally or on a cloud service (e.g., MongoDB Atlas)

### Clone the Repository

```sh
git clone git@github.com:kishanth29/Studio.git
cd Studio
```

### Install Client Dependencies

```sh
cd client
npm install
```

### Install Server Dependencies

```sh
cd ../server
npm install
```

---

## Environment Variables

Create a `.env` file inside the server directory and add the following variables:

```sh
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```

---

## Running the Project

### Start Server

```sh
cd server
npm start
```

### Start Client Development Server

```sh
cd client
npm start
```

The client should be running on `http://localhost:3000`, and the server should be running on `http://localhost:8000`.

---

## API Routes (Server)

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | /api/users/login     | User login             |
| POST   | /api/users/register  | User registration      |
| GET    | /api/products        | Fetch all products     |
| GET    | /api/orders/:id      | Fetch order details    |
| POST   | /api/orders          | Create a new order     |
| POST   | /api/payments/stripe | Stripe payment process |
| POST   | /api/payments/paypal | PayPal payment process |

---

## Project Structure

```
Studio/
│-- client/
│   │-- src/
│   │   │-- components/
│   │   │-- pages/
│   │   │-- redux/
│   │   │-- App.js
│   │   │-- index.js
│   │-- public/
│   │-- package.json
│   │-- .env
│-- server/
│   │-- models/
│   │-- routes/
│   │-- controllers/
│   │-- middleware/
│   │-- utils/
│   │-- server.js
│   │-- package.json
│   │-- .env
```

---

## Creator

- **Kishanth** - Full stack Developer

---

## Contributors
A.hajanraj , S.Thusya, A.suganiya and S.Diluxshan
