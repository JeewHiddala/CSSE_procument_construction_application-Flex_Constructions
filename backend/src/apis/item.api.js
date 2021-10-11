const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller')

module.exports = function () {
    router.post('/create', itemController.createItem);
    router.get('/', itemController.getAllItemDetails);
    router.get('/:id', itemController.getSelectedItemDetails);
    router.get('/:orderRefNo', itemController.getGoodsInItem);
    router.patch('/update/:id', itemController.updateSelectedItemDetails);
    router.delete('/:id', itemController.deleteItem);
   
    return router;
}