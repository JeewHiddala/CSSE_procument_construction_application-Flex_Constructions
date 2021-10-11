const mongoose = require('mongoose');       //import mongoose
const mongoosePaginate = require('mongoose-paginate-v2');

const SupplierSchema = new mongoose.Schema({       //make schema
  supplierId: { type: String, required: true },
  supplierName: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  contactNo: { type: String, required: true, trim: true }
});

SupplierSchema.plugin(mongoosePaginate);
const Supplier = mongoose.model('suppliers', SupplierSchema);       //give name for collection
module.exports = Supplier;