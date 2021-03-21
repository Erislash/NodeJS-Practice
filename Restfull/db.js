const mariadb = require('mariadb');
require('dotenv/config');
const db = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    host: process.env.DB_HOST,
    database: process.env.DB_DB,
};

const pool = mariadb.createPool(db);

module.exports = pool