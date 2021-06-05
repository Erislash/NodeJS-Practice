require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mariadb'
});

async function connect(callback){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        callback(null, sequelize);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        callback(error);
    }
}
module.exports = connect;