const express = require('express');
const router = express.Router();
const path = require('path');
const {signUpGET, signUpPOST, loginGET, loginPOST} = require(path.join(__dirname, '..', 'controllers', 'authControllers.js'));


router.get('/signup', signUpGET);
router.post('/signup', signUpPOST);

router.get('/login', loginGET);
router.post('/login', loginPOST);



module.exports = router; 

