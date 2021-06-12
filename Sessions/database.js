require('dotenv').config();

const mariadb = require('mariadb');
module.exports = mariadb.createConnection({
    host: process.env.HOST, 
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})