'use strict'
require('dotenv').config();
const path = require('path');
const port = process.env.PORT;

const Express = require('express');
const app = Express();

app.use(Express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));


const mariadb = require('mariadb');

// Importing DB connection
const connection = require(path.join(__dirname, 'database', 'connection.js'));

// Importing Routes
const indexRoutes = require(path.join(__dirname, 'routes', 'index-routes.js'));
// const authRoutes = require(path.join(__dirname, 'routes', 'auth-routes.js'));

// Importing session and passport
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const bcrypt = require('bcrypt');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 
    }
}));


app.use(passport.initialize());
app.use(passport.session());


// Not found Page
connection((err, conn) => {
    if (!err) {
        console.log('DB connected!');

        // Using Routes
        app.use(indexRoutes);
        // app.use('/auth', authRoutes);

        
        function ensureAuthenticated(req, res, next){
            if (req.isAuthenticated()) {
                return next();
            }
            res.redirect('/');
        }


        app.get('/profile', [ensureAuthenticated, (req, res) => {
            res.status(201).render('profile.ejs', {username:req.user.username});
        }]);



        app.route('/auth/local/logout')
        .get((req, res) => {
            req.logout();
            res.redirect('/');
        });


        app.post('/auth/local/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
            res.redirect('/profile');
        });

        app.post('/auth/local/register', (req, res) => {
            if (req.body.username && req.body.password){
                const username = req.body.username;
                conn.query("SELECT * FROM users WHERE username = ?", [username])
                .then(result => {
                    if (result) {
                        console.log('Trying to sign in');
                        let users = [];
                        for (let user of result){
                            users.push(user);
                        }
                        if (users.length > 0){
                            console.log('Username taken');
                            return res.redirect('/');
                        }
                        console.log(users);
                        const hash = bcrypt.hashSync(req.body.password, 12);

                        conn.query("INSERT INTO users VALUES (NULL, ?, ?);", [username, hash])
                        .then(insertResult => {
                            console.log(insertResult);
                            return res.redirect('/profile');
                        })
                        .catch(err => {
                            console.log(err);
                            return res.redirect('/');
                        });
                    }
                })
                .catch(err => {
                    return res.redirect('/');
                });
            }else{
                res.redirect('/');
            }

        });
        
        
        app.use(function(req, res, next) {
            res.status(404).render('404.ejs');
        });


        // 'serializeUser' takes 2 args: the full user object and a callback used by passport
        passport.serializeUser((user, done) => {
            console.log("SERIALIZANCO");
            done(null, user.id);
        });

        
        passport.deserializeUser((id, done) => {

            conn.query("SELECT * FROM users WHERE id = ?", [id])
            .then(res => {
                if (res) {
                    console.log("Deserialization complete...");

                    let users = [];
                    for (let user of res){
                        users.push(user);
                    }
                    if (users.length == 1){
                        return done(null, users[0]);
                    }

                    done(new Error('Unexected error while retrieving User'), null);
                }
            })
            .catch(err => {
                console.log('Cannot deserialize:\n\n', err);
                done(new Error('Error while retrieving User'), null);
            });
        });


        passport.use(new LocalStrategy(
            function (username, password, done) {
                console.log('USING LOCAL');

                conn.query("SELECT * FROM users WHERE username = ?", [username])
                .then(res => {
                    console.log('User '+ username +' attempted to log in.');

                    let users = [];
                    for (let user of res){
                        users.push(user);
                    }

                    let user = users[0]

                    if (!user) return done(null, false);

                    if (!bcrypt.compareSync(password, user.password)) { 
                      return done(null, false);
                    }

                    return done(null, user);
                })
                .catch(err => {
                    console.log('Error while logging');
                    done(err, null);
                });
            }
        ));



        
        

        app.listen(port, () => console.log('Server running on port ' + port + '...'));
        return;
    }

    console.log('Cannot connect to DB...');
});



