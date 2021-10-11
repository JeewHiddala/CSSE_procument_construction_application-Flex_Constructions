const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

module.exports = function () {
    router.post('/create', paymentController.createPayment);        // create Ingredient.
    router.get('/', paymentController.getAllPaymentsDetails);       //get all Ingredient.
    return router;
}