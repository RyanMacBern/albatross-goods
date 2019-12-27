var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var retailerSchema = new Schema({
  name: String,
  url: String
});

var Retailer = mongoose.model('Retailer', retailerSchema);

module.exports = Retailer;