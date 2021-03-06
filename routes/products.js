var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var currencyFormatter = require('currency-formatter');

var config = require('../config');

const { products } = require('../controllers/products.js');

/* GET products json */
router.get('/', products);

/* GET products view */
router.get('/view', function(req, res, next) {

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

      res.render('products', { title: 'Products', products: products });
    });
  });

});

module.exports = router;
