const mariadb = require('mariadb');

// Creating pool
const pool = mariadb.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Callback takes 1) error and 2) connection
module.exports = (callback) => {
    pool.getConnection()
    .then(conn => {
        callback(null, conn);
    }).catch(err => {
        callback(err, null);
    });
}