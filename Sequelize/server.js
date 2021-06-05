require('dotenv').config();

const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = process.env.PORT || 3000;
const PATH = require('path');

const sequelize = require(PATH.join(__dirname, 'database', 'db.js'));

APP.set('view engine', 'ejs');
APP.set('views', PATH.join(__dirname, 'views'));
APP.use(EXPRESS.static(PATH.join(__dirname, 'public')))
APP.use(EXPRESS.urlencoded({extended:false}));

const ROUTES = require(PATH.join(__dirname, 'routes', 'routes.js'));

APP.use(ROUTES);

sequelize((err, seq) => {
    if(!err){
        seq
        .sync()
        .then(res => {
            APP.listen(PORT, () => {
                console.log('Server running on PORT ' + PORT + '...');
            });
        })
    }
});

