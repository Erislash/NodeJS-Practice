require("dotenv").config();
const path = require('path');

const express = require('express');
const session = require('express-session');
const db = require(path.join(__dirname, 'database.js'));
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();

const routes = {
    home: require(path.join(__dirname, 'routes', 'home.js'))
}


app.use(express.json());
app.use(express.urlencoded({extended:false}));

const store = new SequelizeStore({
    db: db,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000
});


app.use(session({
    secret: process.env.SESSION_SECRET,
    store: store,
    resave: true,
    saveUninitialized: true
}));

store.sync();


app.use(routes.home);


module.exports = app;
