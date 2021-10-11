const mongoose = require('mongoose');       //import mongoose

const LogSchema = new mongoose.Schema({       //make schema
  logId: { type: Number, required: false },
  descriptions: { type: String, required: true, trim: true },
  orderRef: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'orders'}
});

const Log = mongoose.model('logs', LogSchema);       //give name for collection
module.exports = Log;