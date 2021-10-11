const mongoose = require('mongoose');       //import mongoose
const mongoosePaginate = require('mongoose-paginate-v2');

const InvoiceSchema = new mongoose.Schema({       //make schema
  invoiceNo: { type: Number, required: true },
  date: { type: Date, required: true, trim: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  orderRef: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'orders'}
});

InvoiceSchema.plugin(mongoosePaginate);
const Invoice = mongoose.model('invoices', InvoiceSchema);       //give name for collection
module.exports = Invoice;