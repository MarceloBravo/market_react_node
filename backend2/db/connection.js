const mysql = require('mysql2');    //npm install mysql2

let connection = {}
//mysql://b6610f3663d3ed:7507053f@us-cdbr-east-04.cleardb.com/heroku_b0601f717a83a2a?reconnect=true
/*
connection.pool = () => {
    return mysql.createPool({
        connectionLimit : 10,
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'mabc',
        database: 'market',
        //host: 'sql100.epizy.com',
        //port: '3306',
        //user: 'epiz_31539982',
        //password: 'olecram76',
        //database: 'epiz_31539982_market',
        debug: false,
    });
}
*/

connection.pool = () => {
    return mysql.createPool({
        connectionLimit : 10,
        host: 'us-cdbr-east-05.cleardb.net',    //heroku
        port: '3306',
        user: 'b085d89fcd3e1d',
        password: '5cd4aaf0',
        database: 'heroku_d1e6973865f067e',
        debug: false,
        connectTimeout: 30000
    });
}
/*
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