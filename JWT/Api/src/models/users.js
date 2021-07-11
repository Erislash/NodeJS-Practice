const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const db = require(path.join(__dirname, '..', 'database.js'));

module.exports = (callback) => db((sequelize) => {
    const User = sequelize.define('User', {
        // Model attributes are defined here
        username: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
          }
      });
      User.sync()
      .then(res => {
        callback(User);
      })
})

