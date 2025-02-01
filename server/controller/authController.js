const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const crypto = require("crypto");
const ErrorHandler = require("../utils/Errorhandler");
const sendToken = require("../utils/jwt");

//  register  /api/v1/register

exports.registerUser = catchAsyncError(async (req, res) => {
  const { name, email, password } = req.body;
  let avatar;
  if(req.file){
        avatar =`${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`
  }
  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });
  // const token = user.getJwtToken();
  // res.status(201).json({
  //   success:true,
  //   user,
  //   token
  // })
  sendToken(user, 201, res);
});



//  login user /api/v1/login

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("please enter email&password", 400));
  }

  // finding the user database

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid  email or password", 401));
  }

  // password verification both are same or not

  if (!(await user.isValidPassword(password))) {
    return next(new ErrorHandler("Invalid  email or password", 401));
  }

  sendToken(user, 200, res);
  // const token = user.getJwtToken();
  // res.status(201).json({
  //   success:true,
  //   user,
  //   token
  // })
});



//  log out controller - /api/v1/logout

exports.logoutUser = (req, res) => {
  //  first we remove the token value using null value
  res
    .cookie("token", null, {
      //  conver to expire cookie
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Loggedout",
    });
};



//  forgot password - /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  // Collect email information from user
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 401));
  }

  // Generate reset token and save it
  const resetToken = user.getResetToken();
  await user.save({ validateBeforeSave: false });

  // Create reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  try {
    // Send the reset URL to the frontend
    res.status(200).json({
      success: true,
      message: resetUrl,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});



//  decode the hash value - /api/v1/password/reset/:token

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: {
      $gt: Date.now(),
    },
  });

  // Check if the token is valid
  if (!user) {
    return next(
      new ErrorHandler("Password reset token is invalid or has expired", 400)
    );
  }

  // Check if the new password and confirm password match
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords does not match", 400));
  }

  // Set the new password
  user.password = req.body.password;

  // Clear the reset token fields
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;

  // Save the user
  await user.save({ validateBeforeSave: false });

  // Send token
  sendToken(user, 200, res);
});




//  get User profile - /api/v1/myprofile
exports.getUserProfile = catchAsyncError(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});



// Change password - /api/v1/password/change

exports.changePassword = catchAsyncError(async (req, res,next) => {
  //  select function will passmpassword value
  const user = await User.findById(req.user.id).select("+password");

  // check password
  if (!(await user.isValidPassword(req.body.oldPassword))) {
    return next(new ErrorHandler("Old password is incorrect", 401));
  }
  //  assigning new password
  user.password = req.body.password;
  await user.save();
  res.status(200).json({
    success: true
    
  });
});

// Update user Profile

exports.updateProfile = catchAsyncError(async(req,res,next) => {
    let newUserData = {
      name:req.body.name,
      email: req.body.email,

    }

    if(req.file){
      avatar =`${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`
      newUserData = {...newUserData, avatar}
    }
    const user = await User.findByIdAndUpdate(req.user.id ,newUserData, {
      //  it code will show new data from change user details
      new:true,
      runValidators:true
    })
    res.status(200).json({
      success: true,
      user
    })

})

// ---------------------- ADMIN CONTROL API --------------------------

// Admin: Get All Users - /api/v1//admin/users

exports.getAllUsers = catchAsyncError(async(req,res,next) => {
    const users = await User.find();
    res.status(200).json({
      success:true,
      users
    })
})


// Admin:  Get specific users - /api/v1/admin/user/:id

exports.getUsers =catchAsyncError(async(req,res,next) => {
  const user = await User.findById(req.params.id);
  //  while we have wrong id 
  if(!user){
    return next (new ErrorHandler (`User not found with this id ${req.params.id}`))
  }
  res.status(200).json({
    success: true,
    user
  })
});



// Admin :Update User role - /api/v1/admin/user/:id

exports.updateUser = catchAsyncError(async(req,res,next) => {
  const newUserData = {
    name:req.body.name,
    email: req.body.email,
    role:req.body.role

  }
  const user = await User.findByIdAndUpdate(req.params.id ,newUserData, {
    //  it code will show new data from change user details
    new:true,
    runValidators:true
  })
  res.status(200).json({
    success: true,
    user
  })
})


// Admin : Delete User - /api/v1/admin/user/:id

exports.deleteUser = catchAsyncError(async(req,res,next) => {
  const user = await User.findById(req.params.id);
  if(!user){
    return next (new ErrorHandler (`User not found with this id ${req.params.id}`))
  }
  await user.deleteOne();
  res.status(200).json({
    success: true,
    
  })


})
