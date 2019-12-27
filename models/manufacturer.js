var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var manufacturerSchema = new Schema({
  name: String,
  url: String,
  country: String
});

var Manufacturer = mongoose.model('Manufacturer', retailerSchema);

module.exports = Manufacturer;