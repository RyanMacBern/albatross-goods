var MongoClient = require('mongodb').MongoClient;
var currencyFormatter = require('currency-formatter');

var config = require('../config');

exports.products = (req, res) => {
  MongoClient(config.db.url, config.db.options).connect((err, client) => {
    if (err) throw err

    const db = client.db(config.db.name);
    db.collection("products").find().sort({_id: -1}).toArray(function (err, products) {
      if (err) throw err
  
      console.log('products found', products);

      products.forEach(function(product) {
        if (product.price) {
          product.price = currencyFormatter.format(product.price, { code: 'USD' });
        }
      });

      res.json({products});
    });
  });
};