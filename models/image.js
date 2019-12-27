var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
  remote: String,
  local: String
});

var Image = mongoose.model('Image', imageSchema);

module.exports = Image;