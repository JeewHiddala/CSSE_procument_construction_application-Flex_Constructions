const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/delivery.controller');

module.exports = function () {
    router.post('/create', deliveryController.createDelivery);
    router.get('/', deliveryController.getAllDeliveryDetails);
    router.get('/:id', deliveryController.getSelectedDeliveryDetails);
    router.delete('/:id', deliveryController.deleteDelivery);// delete a serviceList

    return router;
}