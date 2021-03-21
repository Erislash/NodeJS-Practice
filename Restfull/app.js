const EXPRESS = require('express');     //Import the package
const APP = EXPRESS();              //Excecute the package
const mariadb = require('mariadb'); //MariaDB Node.js Connector
const {pool} = require('./db');
const bodyPar = require('body-parser');

APP.use(bodyPar.json());

//Import routes
const postsRoute = require('./routes/posts');
APP.use('/posts', postsRoute);

// Routes through express
APP.get('/', (request, response) => {
    response.send('We are on Home');
})

// Listening to the server:
const PORT = 3000;
APP.listen(PORT, () => console.log('SERVER RUNNING ON PORT', PORT + '...'));