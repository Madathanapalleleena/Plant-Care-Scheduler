const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // change if you use a different user
  password: 'root',         // add your MySQL password if any
  database: 'plantcare' // make sure this matches your DB name
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error: ', err);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

module.exports = db;
