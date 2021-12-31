var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.config();




var indexRouter = require('./routes/index');
var productRouter = require('./routes/api/products');
var userRouter = require('./routes/api/users');
var authRouter = require('./routes/api/auth');
var cartRouter = require('./routes/api/cart');
var orderRouter = require('./routes/api/order');


var cors = require('cors');
var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/products', productRouter);
app.use('/api/users',userRouter);
app.use('/api/auths',authRouter);
app.use('/api/orders',orderRouter);
app.use('/api/carts',cartRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("Successfully connected");
}).catch(err => {
  console.log("Error connecting");
  console.log(err.message);});


module.exports = app;
