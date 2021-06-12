'use static'
//express-session
require('dotenv').config();

const path = require('path');
const port = process.env.PORT || 3000;

const Express = require('express');
const app = Express();
const db = require(path.join(__dirname, 'database.js'));

const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const users = [];

class User{
    constructor(username, email, password){
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(Express.static(path.join(__dirname, 'public')));
app.use(Express.urlencoded({extended:false}));


app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}))


app.get('/profile', (req, res) => {
    if(req.session?.isAuth){
        res.render('profile.ejs');
    }else{
        res.redirect('/');
    }
});


app.post('/register', (req, res) => {
    const username = req.body.username;
    const email = req.body.mail;
    let password = '';
    if(req.body.password){
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            password = hash;
            const newUser = new User(username, email, password);
            users.push(newUser);
            console.log(users);
            res.redirect('/');
        });
    }
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    let password = req.body.password;
    
    for (user of users){
        console.log(user.username);
        if(user.username === username || user.email == username){
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                    req.session.isAuth = true;
                    return res.redirect('/profile');
                }else{
                    console.log('Wrong Password');
                    return res.redirect('/');
                }
            });
        }
    }
    
});




app.get('/', (req, res) => {
    let views = req.session?.views || 0;
    views++;
    req.session.views = views;
    res.render('index.ejs', {views});
});


db
.then(() => {
    console.log('Db Connected');
    app.listen(port, () => {
        console.log('Server running on port ' + port + '...');
    });
})
.catch(() => console.log('Db NOT Connected'))


