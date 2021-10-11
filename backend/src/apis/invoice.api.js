const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoice.controller');

module.exports = function () {
    router.post('/create', invoiceController.createInvoice);        // create invoices.
    router.get('/', invoiceController.getAllInvoicesDetails);       //get all invoices.
    return router;
}