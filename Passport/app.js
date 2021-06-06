require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const authRoutes = require(path.join(__dirname, 'routes', 'auth-routes.js'));
const profileRoutes = require(path.join(__dirname, 'routes', 'profile-routes.js'));


const passportSetup = require(path.join(__dirname, 'config', 'passport-setup.js'));

const cookieSession = require('cookie-session');

const passport = require('passport');

const Mongoose = require('mongoose');
Mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to MongoDB');
});

// set view engine
app.set('view engine', 'ejs');


app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));


//Inint passport
app.use(passport.initialize());
app.use(passport.session())

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
