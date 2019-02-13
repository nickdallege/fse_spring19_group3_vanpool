const express = require('express');
const mysql = require('mysql');

const credentials = require('./client/src/credentials');
const password = credentials.PASSWORD;
const db = credentials.DB;

const app = express();
const PORT = process.env.PORT || 5000;
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: password,
  database: db
})

require('./client/src/routes/html-routes')(app, connection);

// if error, log the error message
connection.connect(function (err) {
  (err) ? console.log(err) : console.log(connection);
});

//CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// launch our backend into a port
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
