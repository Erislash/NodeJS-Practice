const exp = require('express');
const Router = exp.Router();
const path = require('path');
const rootDir = require('../helpers/path');
const {products} = require('./admin');

Router.get('/', (request, response) => {
    response.render('shop.ejs', {products, pageTitle: 'Shop'});
}); 


module.exports = Router;
