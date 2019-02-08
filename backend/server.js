const express = require('express');
const mysql = require('mysql');

const credentials = require('./credentials');
const password = credentials.PASSWORD;
const db = credentials.DB;

const app = express();
const PORT = process.env.PORT || 3000;


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: password,
  database: db
})

require('./routes/html-routes')(app, connection);

// if error, log the error message
connection.connect(function(err) {
  (err)? console.log(err): console.log(connection);
});


// launch our backend into a port
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
