const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = connection.models.User;

const {validPassword} = require('../lib/passwordUtils');

const customFields = {
    usernameField:'uname',
    passwordField:'pw'
};


function verifyCallback(username, password, done){
    /* "username" will be the value we'll receive in the body of a POST request.
        by default passport will look for "username" and "password" fields. So, you MUST
        name the username and passport fields of your form with those names (username and password)
        respectively. Anyways, we can customize what field's name passport is going to look for manually,
        there is when "custmoFields" object comes to play
    */
    /* "done" represents a function you'll eventually pass the result of your authentication to. It doesn't 
    matter what DB you use or how you choose to verify the credentials. All what matter is that the values you pass to the "done" function are the ones that passport is expecting
    */

    User.findOne({username: username})
    .then(user => {
        if (!user) return done(null, false);
        const isValid = validPassword(password, user.hash, user.salt);

        if (isValid) return done(null, user);
        return done(null, false);
    })
    .catch(err => {
        console.log("Cannot authenticate user");
        done(err, null);
    });

}

// Create a strategy. This strategy requires a verify callback
const strategy = new LocalStrategy(customFields, verifyCallback);


passport.use(strategy);


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
    .then(user => {
        done(null, user);
    })
    .catch(err => done(err, false));
});