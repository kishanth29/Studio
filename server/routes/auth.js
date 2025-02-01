const express = require('express');
const multer = require('multer');
const path = require('path')

//  we get user images and details 

const upload = multer({storage:multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'../','uploads/user'))
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
}) })



const { 
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    changePassword,
    updateProfile,
    getAllUsers,
    getUsers,
    updateUser,
    deleteUser,
     
    
 } = require('../controller/authController');
const router = express.Router();
const {isAuthenticatedUser, authourizeRoles} = require('../middleware/authenticate')

router.route('/register').post(upload.single('avatar'),registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/password/change').put(isAuthenticatedUser, changePassword);
router.route('/myprofile').get(isAuthenticatedUser, getUserProfile);
router.route('/updateProfile').put(isAuthenticatedUser,upload.single('avatar'), updateProfile);


//  ---------------ADMIN ROUTES ---------------------
router.route('/admin/users').get(isAuthenticatedUser,authourizeRoles('admin'),getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authourizeRoles('admin'), getUsers)
                                .put(isAuthenticatedUser,authourizeRoles('admin'),updateUser)
                                .delete(isAuthenticatedUser,authourizeRoles('admin'),deleteUser);



module.exports = router;

