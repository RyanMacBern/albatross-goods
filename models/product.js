var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Offer = require(process.cwd() + '/models/offer');
var Image = require(process.cwd() + '/models/image');

var productSchema = new Schema({
  title: { type: String, required: true, unique: false },
  offers: [Offer.schema],
  images: [Image.schema]
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;