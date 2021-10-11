const mongoose = require('mongoose');       //import mongoose

const GoodReceiptSchema = new mongoose.Schema({       //make schema
  goodReceiptId: { type: Number, required: true },
  date: { type: Date, required: true },
  deliveryAdviceNoteId : { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'deliveryadvicenotes'}
});

const GoodReceipt = mongoose.model('goodreceipts', GoodReceiptSchema);       //give name for collection
module.exports = GoodReceipt;