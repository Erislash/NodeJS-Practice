const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    //Handle Passport
    res.send('Logging out');
});


router.get('/google', passport.authenticate('google', {
    scope:['profile']
}));

//Callback Routh Google OAuth
router.get('/google/redirect', passport.authenticate('google'),(req, res) => {
    res.redirect('/profile/');
});


module.exports = router;