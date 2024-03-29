var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//routes
const apiRESTrouter = require('./routes/apiRESTroute');
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');

var app = express();

// to handle CORS
const cors = require('cors');
app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes utilisateurs
app.use('/users', userRouter);
// routes authentification
app.use('/auth', authRouter);
// routes apiREST
app.use('/', apiRESTrouter);

//Par default
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((req, res, next) => next(createError(404)));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
      message: err.message,
      error: err
  });
});

module.exports = app;
