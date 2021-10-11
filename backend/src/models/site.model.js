const mongoose = require('mongoose');       //import mongoose
const mongoosePaginate = require('mongoose-paginate-v2');

const SiteSchema = new mongoose.Schema({       //make schema
  siteNo: { type: Number, required: true },
  location: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  contactNo: { type: String, required: true, trim: true },
  siteMgrId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'employees'}
});

SiteSchema.plugin(mongoosePaginate);
const Site = mongoose.model('sites', SiteSchema);       //give name for collection
module.exports = Site;