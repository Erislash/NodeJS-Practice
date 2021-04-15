const exp = require('express');
const Router = exp.Router();
const path = require('path');

const rootDir = require('../helpers/path');

const products = [];

Router.get('/add-product', (request, response) => {
    response.render('add-product.ejs', {pageTitle: 'Add a new product'})
}); 

Router.post('/add-product', ({body: {title}}, response) => {
    products.push({title});
    response.redirect('/');
}); 

module.exports = {Router, products};