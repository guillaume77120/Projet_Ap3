let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  port: '3308',
  database : 'testdb'
});

connection.connect();

module.exports = connection