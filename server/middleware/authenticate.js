const ErrorHandler = require("../utils/Errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//  isAuthenticatedUser will get cookies

exports.isAuthenticatedUser = catchAsyncError(async (req,res,next) =>{
    const {token} = req.cookies;
    //  without cookies middleware we cannot access above code

    if(!token){
        return next(new ErrorHandler('Login first to handle this resource', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next();
    //  we get user data
})

exports.authourizeRoles = (...roles) => {
    return (req,res,next) => {
        if (!roles.includes(req.user.role) ){
            return next( new ErrorHandler(`Role ${req.user.role} is not allowed`, 401))
        }
        next()
    }
}