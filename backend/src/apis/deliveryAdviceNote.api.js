const express = require('express');
const router = express.Router();

const deliveryAdviceNoteController = require('../controllers/deliveryAdviceNote.controller');

module.exports = function () {
    router.post('/create', deliveryAdviceNoteController.createdeliveryAdviceNote);        // create deliveryAdviceNote.
    router.get('/', deliveryAdviceNoteController.getAlldeliveryAdviceNotesDetails);       //get all deliveryAdviceNote.
    router.get('/:id', deliveryAdviceNoteController.getSelecteddeliveryAdviceNoteDetails);

    return router;
}