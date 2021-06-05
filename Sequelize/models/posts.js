const path = require('path');

const Sequelize = require('sequelize');

const sequelize = require(path.join(__dirname, '..', 'database', 'db.js'));

function reqModel(callback){
    sequelize((err, seq) => {
        if(!err){
            const Post = seq.define('Post', {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true
                },
                title: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                body: {
                    type: Sequelize.TEXT,
                    allowNull: false
                }
            },
            {
                timestamps: false,
                createdAt: false,
                updatedAt: false
            });
    
            callback(Post);
        }
    });
}


module.exports = reqModel;