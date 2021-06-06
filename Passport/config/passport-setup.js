require('dotenv').config();
const path = require('path');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const UserModel = require(path.join(__dirname, '..', 'models', 'user-models.js'));

passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser((id, done) => {
    UserModel.findById(id)
    .then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    }, (accessToken, refreshToken, profile, done) => {
        
        UserModel.findOne({
            googleID: profile._json.sub
        })
        .then((currUser) => {
            if(currUser){
                console.log('User does exist:', currUser);
                done(null, currUser);
            }else{
                new UserModel({
                    username: profile._json.name,
                    googleID: profile._json.sub
                }).save()
                .then(newUser => {
                    console.log('New user created:', newUser);
                    done(null, newUser);
                })
                .catch(err => {
                    console.log('Error while creating User');
                });
            }
        });        
    }
));