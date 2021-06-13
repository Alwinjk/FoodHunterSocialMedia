require("dotenv").load();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
require('./app_api/models/db');
require('./app_api/config/passport');

const apiRouter = require('./app_api/routes/index');
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public','build')));
app.use(passport.initialize());

// app.use(cors());
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, DELETE");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept, Authorization');
  next();
});

app.use('/api',apiRouter);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({"message": err.name + ": " + err.message});
  }
});

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
  res.send('Not Found');
});

module.exports = app;
