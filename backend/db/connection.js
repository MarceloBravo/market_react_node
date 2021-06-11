const mysql = require('mysql2');    //npm install mysql2

let connection = {}

connection.conect = () => {
    return mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'mabc',
        database: 'mabc'
    });
} 

module.exports = connection;