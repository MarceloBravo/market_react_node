const mysql = require('mysql2');    //npm install mysql2

let connection = {}
//mysql://b6610f3663d3ed:7507053f@us-cdbr-east-04.cleardb.com/heroku_b0601f717a83a2a?reconnect=true

connection.pool = () => {
    return mysql.createPool({
        connectionLimit : 10,
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'mabc',
        database: 'market',
        debug: false,
    });
}

/*
connection.pool = () => {
    return mysql.createPool({
        connectionLimit : 10,
        host: 'us-cdbr-east-04.cleardb.com',    //heroku
        port: '3306',
        user: 'b6610f3663d3ed',
        password: '7507053f',
        database: 'heroku_b0601f717a83a2a',
        debug: false,
    });
}

connection.pool = () => {
    return mysql.createPool({
        connectionLimit : 10,
        host: 'fdb34.awardspace.net',    //heroku
        port: '3306',
        user: '3985202_market',
        password: 'EDWspLfzj3H@6Pm',
        database: '3985202_market',
        debug: false,
    });
}
*/
module.exports = connection;