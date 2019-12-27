var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Retailer = require(process.cwd() + '/models/retailer');

var offerSchema = new Schema({
  price: { type: Number, required: true },
  url: { type: String, required: true },
  retailer: Retailer.schema
});

var Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;