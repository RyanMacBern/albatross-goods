var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var adaro = require('adaro');

var index = require('./routes/index');
var products = require('./routes/products');
var product = require('./routes/product');
var addProduct = require('./routes/add-product');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
app.engine('dust', adaro.dust({ helpers: ['dustjs-helpers'], cache: false }));
app.set('view engine', 'dust');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/products', products);
app.use('/product', product);
app.use('/add-product', addProduct);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if (res.status === 404 || err.status === 404) {
    res.status(404);
    res.render('error_404');
  }
  else {
    res.status(err.status || 500);
    res.render('error');
  }
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
