const Express = require('express');
const Router = Express.Router();


// function ensureAuthenticated(req, res, next){
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/');
// }


Router.get('/', (req, res) => {
    res.status(201).render('index.ejs');
});

// Router.get('/profile', [ensureAuthenticated, (req, res) => {
//     res.status(201).render('profile.ejs');
// }]);

module.exports = Router;
