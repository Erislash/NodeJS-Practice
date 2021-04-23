const {Product} = require('../models/product');

exports.getAddProdPage = (request, response) => {
    response.render('add-product.ejs', {pageTitle: 'Add a new product'})
};

exports.postAddProdPage = ({body: {title}}, response) => {
    const prod = new Product(title);
    prod.save();
    response.redirect('/');
};

exports.getProducts = (request, response) => {
    const products = Product.prototype.fetchAll((products) => {
        response.render('shop.ejs', {products, pageTitle: 'Shop'});
    });
    
};