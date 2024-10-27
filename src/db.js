const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express'
});

db.connect(err => {
    if (err) {
        console.error('Error:', err);
    }
});

module.exports = db;