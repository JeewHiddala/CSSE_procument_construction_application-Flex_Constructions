const mongoose = require('mongoose');       //import mongoose


const PaymentSchema = new mongoose.Schema({       //make schema
  payId: { type: Number, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true, trim: true },
  invoiceId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'invoices'}
});

const Payment = mongoose.model('payments', PaymentSchema);       //give name for collection
module.exports = Payment;