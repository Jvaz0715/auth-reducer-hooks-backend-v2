var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");

require('dotenv').config();

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
  })
  .then(() => console.log('MONGO DB CONNECTED'))
  .catch((e) => console.log(e));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/usersRouter');

var app = express();

let originURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "DEPLOYED URL";

app.use(cors({ origin: originURL, credentials: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

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
  res.json('error');
});

module.exports = app;
