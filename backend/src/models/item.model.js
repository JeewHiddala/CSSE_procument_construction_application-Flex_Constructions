const mongoose = require('mongoose');       //import mongoose

const ItemSchema = new mongoose.Schema({       //make schema
  quantity: { type: Number, required: true},
  individualTotprice: { type: Number, required: true},
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'goods'}
});

const Item = mongoose.model('items', ItemSchema);       //give name for collection
module.exports = Item;