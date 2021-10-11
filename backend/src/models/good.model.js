const mongoose = require('mongoose');       //import mongoose

const GoodSchema = new mongoose.Schema({       //make schema
  goodId: { type: Number, required: true },
  goodName: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  itemPrice: { type: Number, required: true }
});


const Good = mongoose.model('goods', GoodSchema);       //give name for collection
module.exports = Good;