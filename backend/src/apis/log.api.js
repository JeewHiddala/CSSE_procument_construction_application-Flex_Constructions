const express = require('express');
const router = express.Router();
const logController = require('../controllers/log.controller');

module.exports = function () {

    router.post('/create', logController.createLog);        // create Ingredient.
    router.get('/', logController.getAllLogsDetails);       //get all Ingredient.

    router.patch('/update/:id', logController.updateSelectedLogDetails);
    router.delete('/:id', logController.deleteLog);
    router.get('/:id', logController.getSelectedLogDetails);      

    return router;
}