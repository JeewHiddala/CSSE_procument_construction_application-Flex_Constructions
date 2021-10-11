const mongoose = require('mongoose');       //import mongoose
const mongoosePaginate = require('mongoose-paginate-v2');

const OrderSchema = new mongoose.Schema({       //make schema
  orderRefNo: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  issueDate: { type: Date, required: true },
  companyName: { type: String, required: true, trim: true },
  deliveryAddress: { type: String, required: true, trim: true },
  totalPrice: { type: Number, required: true },
  approvalStatus: { type: String, required: true, trim: true },
  orderStatus: { type: String, required: true, trim: true },
  site: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'sites'},
  supplier: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'suppliers'},  
  items: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'items'}]
});

OrderSchema.plugin(mongoosePaginate);
const Order = mongoose.model('orders', OrderSchema);       //give name for collection
module.exports = Order;