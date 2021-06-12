//initializations
require('dotenv').config();
const Express = require('express');
const app = Express();
const path = require('path');

const morgan = require('morgan');

const port = process.env.PORT || 3000;

//Settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(Express.static(path.join(__dirname, 'public')));


//Middlewares
app.use(morgan('dev'));
app.use(Express.json());
app.use(Express.urlencoded({extended:true}));


//Routes
const indexRoutes = require(path.join(__dirname, 'routes', 'index-routes.js'));
const authRoutes = require(path.join(__dirname, 'routes', 'auth-routes.js'));
const linksRoutes = require(path.join(__dirname, 'routes', 'links-routes.js'));

app.use(indexRoutes);
app.use(authRoutes);
app.use('/links', linksRoutes);


//Starting the server
app.listen(port, () => {
    console.log("Server running on port " + port + "...");
});
