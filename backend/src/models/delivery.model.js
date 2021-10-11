const mongoose = require('mongoose'); //import mongoose
const DeliverySchema = new mongoose.Schema({ //make schema
  
deliveryId: { type: Number, required: true },
description: { type: String, required: false, trim: true },
deliveryDate: { type: Date, required: true },
numOfItems: { type: Number, required: true },
totalPrice: { type: Number, required: true },
weight: { type: Number, required: true },
supplier: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'suppliers'},
orderRef: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'orders'},
items: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'items'}],
deliveryAdviceNoteId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'deliveryadvicenotes'}});

const Delivery = mongoose.model('deliveries', DeliverySchema); //give name for collection
module.exports = Delivery;

