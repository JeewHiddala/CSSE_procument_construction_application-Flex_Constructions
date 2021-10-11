const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier.controller');

module.exports = function () {
    router.post('/create', supplierController.createSupplier);        // create suppliers.
    router.get('/', supplierController.getAllSupplierDetails);       //get all suppliers.
    router.get('/search/:supplierName', supplierController.getSearchedSupplierDetailsById);  // get search supplier details using supplier name.
    router.patch('/update/:id', supplierController.updateSelectedSupplierDetails); //update selected service details.
    router.get('/:id', supplierController.getSelectedSupplierDetails);       //get selected service details.
    router.delete('/:id', supplierController.deleteSupplier);         //delete selected service details.
    return router;
}