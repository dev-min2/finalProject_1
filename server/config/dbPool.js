const mysql = require('mysql2');

let pool = mysql.createPool( {
    connectionLimit : process.env.MYSQL_LIMIT,
    host : process.env.MYSQL_HOST,
    port : process.env.MYSQL_PORT,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PWD,
    database : process.env.MYSQL_DB
});

async function getConnection() {
    return pool.promise().getConnection(); // 이렇게해야만 커넥션 얻음
};

module.exports = {
    pool,
    getConnection
};