const catchAsyncError = require("..//middleware/catchAsyncError");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/Errorhandler");

//  create New Order = api/v1/order/new

exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    bookingDate,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    bookingDate,
    paidAt: Date.now(),
    user: req.user.id,
  });
  res.status(200).json({
    success: true,
    order,
  });
});

// Get Single Order - api/v1/order/:id

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get Logged in orders - api/v1/myorders

exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//  ADMIN : Get all orders - api/v1/orders

exports.orders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((_orders) => {
    totalAmount += _orders.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Admin : Update Order / Order Status -api/v1/order:id

exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  if (!orders) {
    return next(new ErrorHandler("Orders not found", 404));
  }

  for (let order of orders) {
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("Order has already been delivered", 400));
    }

    // Updating stock for each order item
    for (let _orderItem of order.orderItems) {
      await updateStock(_orderItem.product, _orderItem.quantity);
    }

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save();
  }

  res.status(200).json({
    success: true,
  });
});

async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ErrorHandler("Product not found", 404);
  }

  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}

// Admin : delete order - api/order/:id

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
  });
});
