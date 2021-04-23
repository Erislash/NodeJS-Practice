const exp = require('express');
const Router = exp.Router();
const path = require('path');

const rootDir = require('../helpers/path');

const {getAddProdPage, postAddProdPage} = require('../controllers/products');




Router.get('/add-product', getAddProdPage); 

Router.post('/add-product', postAddProdPage); 

module.exports = {Router};