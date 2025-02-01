const Product = require("../models/productModel.js");
const ErrorHandler = require("../utils/Errorhandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const mongoose = require("mongoose");
const APIFeatures = require("../utils/apiFeatures.js");
//  get products all
exports.getProducts = async (req, res, next) => {
  //  api features
  const resPerPage = 0;
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .paginate(resPerPage);

  const products = await apiFeatures.query;
  const totalProductsCount = await Product.countDocuments({});
  // await new Promise(resolve => setTimeout(resolve , 3000))
  // return next(new ErrorHandler("unable to send products!", 400));
  res.status(200).json({
    success: true,
    count: totalProductsCount,
    resPerPage,
    products,
  });
};

// create products - /api/v1/admin/products/new

exports.newProduct = catchAsyncError(async (req, res, next) => {
  let images = [];
  //  define url for backend
  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  if (req.files.length > 0) {
    req.files.forEach((file) => {
      //  Create URL using the actual file name, not the original one
      let url = `${BASE_URL}/uploads/product/${file.filename}`; // Using file.filename instead of file.originalname
      images.push({ image: url });
    });
  }

  req.body.images = images;

  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// get single product - api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
  const productId = req.params.id;

  // Check if the ID is provided and is valid
  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return next(new ErrorHandler("Invalid product ID", 400));
  }

  try {
    // Fetch the product from the database and populate reviews with user details
    const product = await Product.findById(productId).populate(
      "reviews.user",
      "name email"
    );

    // If the product is not found, throw an error
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Respond with the product data
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

//Update Product - api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  // Uploading images
  let images = [];

  // Check if imagesCleared is a boolean, and parse it if necessary
  const imagesCleared = req.body.imagesCleared === "true";

  // If images not cleared, we keep existing images
  if (!imagesCleared) {
    images = product.images;
  }

  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  // Add a check for req.files
  if (req.files && req.files.length > 0) {
    if (imagesCleared) {
      images = [];
    }

    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/product/${file.originalname}`;
      images.push({ image: url });
    });
  }

  req.body.images = images;

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product - api/v1/product/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    // Trim and validate the product ID
    const productId = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    next(error);
  }
};

// ------------------------------PRODUCT REVIEWS ------------------------------
// Create review - api/v1/review

exports.createReview = catchAsyncError(async (req, res, next) => {
  //  we get data from user
  const { productId, rating, comment } = req.body;
  //  we defined review
  const review = {
    user: req.user.id,
    rating: rating,
    comment,
  };

  const product = await Product.findById(productId);
  //     finding user reviews exists
  const IsReviewed = product.reviews.find((review) => {
    //  check both are same or not same
    return review.user.toString() == req.user.id.toString();
  });
  if (IsReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() == req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    //  creating reviews
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  // find the average of the product reviews
  product.ratings =
    product.reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / product.reviews.length;
  //    it will take product rating value or 0 value from this function
  product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//  Get Reviews - api/v1/reviews?id={productId}

exports.getReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate(
    "reviews.user",
    "name email"
  );
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//  Delete Review api/v1/review

exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  //  filtering the reviews which does not maching the deleting ids

  const reviews = product.reviews.filter((review) => {
    return review._id.toString() !== req.query.id.toString();
  });

  // Number of Reviews
  const numOfReviews = reviews.length;

  //  Finding the Average with filtered reviews
  let ratings =
    reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / reviews.length;
  ratings = isNaN(ratings) ? 0 : ratings;

  //  Saving the product document

  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings,
  });
  res.status(200).json({
    success: true,
  });
});

//  get admin products - api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});
