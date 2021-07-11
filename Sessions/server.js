require('dotenv').config();

const path = require('path');
const app = require(path.join(__dirname, 'app.js'));
const db = require(path.join(__dirname, 'database.js'));
const port = process.env.PORT || 3000;


db.authenticate()
.then((connection) => {
    console.log('Connection has been established successfully.');
    app.listen(port, () => {
        console.log('Server running on port ' + port + '...');
    });    
})
.catch(err => console.error('Unable to connect to the database:', error));
