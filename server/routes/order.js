const express = require('express');
const { 
    newOrder,
    getSingleOrder,
    myOrders,
    orders,
    updateOrder,
    deleteOrder
     } = require('../controller/orderController');
const router = express.Router();
const {isAuthenticatedUser, authourizeRoles} = require('../middleware/authenticate')

router.route('/order/new/').post(isAuthenticatedUser ,newOrder);
router.route('/order/:id').get(isAuthenticatedUser ,getSingleOrder);
router.route('/myorders').get(isAuthenticatedUser ,myOrders);

//  Admin routes
router.route('/admin/orders').get(isAuthenticatedUser ,authourizeRoles('admin'),orders);
router.route('/admin/order/:id').put(isAuthenticatedUser ,authourizeRoles('admin'),updateOrder);
router.route('/admin/order/:id').delete(isAuthenticatedUser ,authourizeRoles('admin'), deleteOrder);

module.exports = router;