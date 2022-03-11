var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('express-handlebars');
require('dotenv').config()
const Product = require('./models/product');


//Set up mongoose connection
var mongoose = require('mongoose');
mongoose.connect(process.env.mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var indexRouter = require('./routes/index');
var productRouter = require('./routes/products');
var categoryRouter = require('./routes/categories');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');
// must be hbs.engine!!!!!
app.engine( 'hbs', hbs.engine( {
  extname: 'hbs',
  defaultLayout: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',

  allowProtoMethodsByDefault: true,
  allowProtoPropertiesByDefault: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);

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


// let insertProducts = async() =>{
//   try{
//       await Product.insertMany ([
//           {
//               name: "Dark Roast Coffee",
//               description: "Meticuously crafted, dark and nutty flavor",
//               category: ["Coffee"],
//               price: 12,
//               quantity: 10,
//               thumbnail: "dark-roast-coffee.jpg"
//           },
//           {
//               name: "Medium Roast Coffee",
//               description: "Meticuously crafted, medium flavor",
//               category: ["Coffee"],
//               price: 12,
//               quantity: 8,
//               thumbnail: "medium-roast-coffee.jpg"
//           },
//           {
//               name: "Blonde Roast Coffee",
//               description: "Meticuously crafted, dark and nutty flavor",
//               category: ["Coffee"],
//               price: 12,
//               quantity: 6,
//               thumbnail: "blonde-roast-coffee.jpg"
//           },
//           {
//               name: "Instant Coffee",
//               description: "Insant Coffee",
//               category: ["Coffee"],
//               price: 15,
//               quantity: 7,
//               thumbnail: "instant-coffee.jpg"
//           },


//       ]);
//   } catch (err){
//       console.log(err);
//   }
// }
// insertProducts();

module.exports = app;
