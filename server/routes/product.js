const express = require('express');
const {
  isAuthenticatedUser,
  authourizeRoles,
} = require('../middleware/authenticate');
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReview,
  getAdminProducts,
} = require('../controller/productController.js');
const router = express.Router();

const multer = require('multer');
const path = require('path');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../', 'uploads/product'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Public Routes
router.route('/products').get(getProducts);
router.route('/products/:id').get(getSingleProduct);
router.route('/review').put(isAuthenticatedUser, createReview);

// Admin Routes
router
  .route('/admin/products/new')
  .post(
    isAuthenticatedUser,
    authourizeRoles('admin'),
    upload.array('images'),
    newProduct
  );

router
  .route('/admin/products')
  .get(isAuthenticatedUser, authourizeRoles('admin'), getAdminProducts);

router
  .route('/admin/product/:id')
  .delete(isAuthenticatedUser, authourizeRoles('admin'), deleteProduct);

router
  .route('/admin/products/:id')
  .put(
    isAuthenticatedUser,
    authourizeRoles('admin'),
    upload.array('images'), // Ensure to handle multiple image uploads
    updateProduct
  );

router
  .route('/admin/reviews')
  .get(isAuthenticatedUser, authourizeRoles('admin'), getReviews);

router
  .route('/admin/review')
  .delete(isAuthenticatedUser, authourizeRoles('admin'), deleteReview);

module.exports = router;
