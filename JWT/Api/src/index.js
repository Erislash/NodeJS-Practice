require('dotenv').config();

const path = require('path');
const app = require(path.join(__dirname, 'app.js'));
const port = process.env.PORT || 3000;
const db = require(path.join(__dirname, 'database.js'));

const userModel = require(path.join(__dirname, 'models', 'users.js'));

db((connection) => {
    app.listen(port, () => {
        userModel((model) => {
            
        });
        console.log('Server running on port ' + port + '...');
    });
});



