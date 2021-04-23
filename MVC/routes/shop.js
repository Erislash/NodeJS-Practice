const exp = require('express');
const Router = exp.Router();
const path = require('path');

const {getProducts} = require('../controllers/products');

Router.get('/', getProducts); 


module.exports = Router;
