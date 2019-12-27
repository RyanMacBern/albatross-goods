var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var currencyFormatter = require('currency-formatter');

var config = require('../config');

/* GET product page. */
router.get('/', function(req, res, next) {

  var product_id = req.query.id;
  if (product_id) {
    MongoClient(config.db.url, config.db.options).connect((err, client) => {
      if (err) throw err
    
      const db = client.db(config.db.name);
      db.collection("products").findOne({ '_id': new ObjectId(product_id) }, function (err, product) {
        if (err) throw err
    
        if (product) {
          console.log('product', product);
          if (product.price) {
            product.price = currencyFormatter.format(product.price, { code: 'USD' });
          }
          res.render('product', { title: product.title, product: product });
        }
        else {
          console.log('product id not found in db', product_id);
          res.status(404);
          next();
        }
      });
    });
  }
  else {
    console.log('id missing from query params');
    res.status(404);
    next();
  }

});

module.exports = router;
