var express = require('express');
var router = express.Router();
//var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var extend = require('util')._extend;
var url = require('url');
var path = require('path');
var request = require('request');
var fs = require('fs');
var http = require('http');

var config = require('../config');

var Product = require(process.cwd() + '/models/product');
var Offer = require(process.cwd() + '/models/offer');
var Image = require(process.cwd() + '/models/image');

var render = function(res, data) {
  res.render('add-product', extend({title: 'Add Product'}, data));
};

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    //console.log('content-type:', res.headers['content-type']);
    //console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(process.cwd() + '/public/' + filename)).on('close', callback);
  });
};

router.get('/', function(req, res, next) {  
  // todo escape user input to prevent injection
  var product = req.query.product;
  render(res, { product: product });
});

router.post('/', function(req, res, next) {

  var renderPost = function(product, error) {
    render(res, { addProduct: true, product: product, error: error });
  };

  var reqProduct = req.body.product;
  var product = new Product({
    title: reqProduct.title,
    offers: [new Offer({
      price: reqProduct.price,
      url: reqProduct.url
    })],
    images: reqProduct.images
  });

  var err = product.validateSync();
  if (err) {
    return renderPost(reqProduct, err);
  }

  mongoose.connect('mongodb://localhost:27017/albatrossgoods', {useUnifiedTopology: true}).then(
    () => {
      product.save(function (err, res) {
        if (err) {
          return renderPost(reqProduct, err);
        }
        console.log('new product saved');
        if (res.images && res.images.length && res.images[0].remote) {
          console.log('downloading images...');
          var parsedUrl = url.parse(res.images[0].remote);
          console.log('parsedUrl: ', parsedUrl);
          var filepath = '/images/products/' + path.basename(parsedUrl.pathname);
          console.log('filepath: ', filepath);
          res.images[0].local = filepath;
          download(res.images[0].remote, res.images[0].local, function() {
            res.save(function (err, res) {
              if (err) {
                return renderPost(reqProduct, err);
              }
              renderPost(res);
            });
          });
        }
        else {
          renderPost(res);
        }
      });
    },
    err => {
      return renderPost(reqProduct, err);
    }
  );
});

module.exports = router;
