const mongoose = require('mongoose');       //import mongoose

const deliveryAdviceNoteSchema = new mongoose.Schema({       //make schema
  deliveryAdviceNoteId: { type: Number, required: true },
  orderRef: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'orders'}
});

const deliveryAdviceNote = mongoose.model('deliveryadvicenotes', deliveryAdviceNoteSchema);       //give name for collection
module.exports = deliveryAdviceNote;