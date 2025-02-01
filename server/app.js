require('dotenv').config();
const express = require('express');
//  all function for express
const app = express();
const errorMiddleWare =require('./middleware/Error')
const cookieParser =require ('cookie-parser')
const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')
const payment = require('./routes/payment')
const cors = require('cors');
const path = require('path')
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,"config/config.env")})




app.use(express.json());
app.use(cookieParser());
//  change to static folder
app.use('/uploads',express.static(path.join(__dirname,'uploads') ) )

//  products
app.use('/api/v1', products);

//  user
app.use('/api/v1', auth);
//  order
app.use('/api/v1', order);
// payment
app.use('/api/v1', payment);




//  middleware
app.use(errorMiddleWare)
app.use(cors({
    
}));

// app.use((err, req, res, next) => {
//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || 'Internal Server Error';
  
//     res.status(err.statusCode).json({
//       success: false,
//       message: err.message,
//       stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
//       error: {
//         statusCode: err.statusCode
//       }
//     });
//   });

module.exports = app;