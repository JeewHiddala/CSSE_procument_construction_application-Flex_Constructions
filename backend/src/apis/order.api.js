const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

module.exports = function () {
    router.post('/create', orderController.createOrder);        // create order.
    router.get('/', orderController.getAllOrderDetails);       //get all order.

    router.get('/search/', orderController.getSearchedOrderDetails);  // get search order details using service number.
    router.get('/searchWithoutDateRange/', orderController.getSearchedOrderDetailsWithoutDateRange);  // get search order details using service number.
    router.get('/:id', orderController.getSelectedOrderDetails);       //get all order.
    router.get('/charge/:id', orderController.calculateCount);
    return router;

 
    router.get('/search/:orderRefNo', orderController.getSearchedOrderDetails);  // get search order details using service number.

    router.patch('/update/:id',orderController. updateSelectedOrderDetails);
    return router;

    

}