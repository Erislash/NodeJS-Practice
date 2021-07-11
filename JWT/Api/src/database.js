const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mariadb'
});

module.exports = (callback) => {
    sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        callback(sequelize);
    })
    .catch(() => {
        console.error('Unable to connect to the database:', error);
    });
}
