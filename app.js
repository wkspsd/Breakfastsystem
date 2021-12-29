const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose=require('mongoose');
var session = require('express-session');
const MongoStore = require('connect-mongo');
const indexRouter = require('./routes/index');
const {Store}=require('express-session');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret:"Breakfastsystem",
  //Store:MongoStore.create({mongoUrl:'mongodb://127.0.0.1:27017/breakfastsystem'}),
  Store:MongoStore.create({mongoUrl:'mongodb+srv://lancer775:mongo555@cluster0.rikbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'}),
  cookie:{maxAge:1000*60*10,httpOnly:false},
  resave: false,
  saveUninitialized: false
}));

app.use('/', indexRouter);
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


mongoose.connect('mongodb+srv://lancer775:mongo555@cluster0.rikbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
//mongoose.connect('mongodb://127.0.0.1:27017/breakfastsystem');


module.exports = app;
