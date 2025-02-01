const catchAsyncError = require("../middleware/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process payment
exports.processPayment = catchAsyncError(async (req, res, next) => {
  const { amount, shipping } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Make sure the amount is in cents
      currency: "usd", // Set the appropriate currency
      description: "Payment for order",
      metadata: { integration_check: "accept_payment" },
      shipping,
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error); // Catch any errors that occur in this try block
  }
});

// Send Stripe API Key (publishable key for frontend)
exports.sendStripeApi = catchAsyncError(async (req, res, next) => {
  // Use environment variables for the Stripe publishable key
  const stripeApiKey = process.env.STRIPE_API_KEY;

  res.status(200).json({
    stripeApiKey, // Send the publishable API key to the frontend
  });
});
