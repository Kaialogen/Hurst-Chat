const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'db',
    user: 'user',
    password: 'userpassword',
    database: 'mydatabase'
  });

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as ID', connection.threadId);
});
  
module.exports = connection;