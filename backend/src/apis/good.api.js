const express = require('express');
const router = express.Router();
const goodController = require('../controllers/good.controller');

module.exports = function () {

  
    router.post('/create', goodController.createGood);        // create good.
    router.get('/', goodController.getAllGoodsDetails);       //get all good.
    router.get('/search/:supplierName', goodController.getSearchedGoodDetailsById);  // get search good details using good name.
    router.patch('/update/:id', goodController.updateSelectedGoodDetails); //update selected good details.
    router.get('/:id', goodController.getSelectedGoodDetails);       //get selected good details.
    router.delete('/:id', goodController.deleteGood);         //delete selected good details.

    return router;
}