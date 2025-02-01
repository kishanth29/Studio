const express = require("express");
const {
  processPayment,
  sendStripeApi,
} = require("../controller/paymentController");
const { isAuthenticatedUser } = require("../middleware/authenticate");
const router = express.Router();

// Route to process payment
router.route("/payment/process").post(isAuthenticatedUser, processPayment);

// Route to send Stripe API key
router.route("/stripeapi").get(isAuthenticatedUser, sendStripeApi);

module.exports = router;
