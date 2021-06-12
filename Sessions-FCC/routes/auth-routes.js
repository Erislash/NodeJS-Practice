const Express = require('express');
const Router = Express.Router();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');


Router.post('/local/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
    res.status(300).redirect('/profile');
});


module.exports = Router;
