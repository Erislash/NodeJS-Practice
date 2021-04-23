const fs = require('fs');
const path = require('path');
const rootPath = require('../helpers/path');
const p = path.join(rootPath, 'data', 'products.json');



function Product(title = 'Untitled product'){
    this.title = title;
}

Product.prototype.save = function() {
    fs.readFile(p, (err, data) => {
        let products = [];
        if(!err){
            products = JSON.parse(data);
        }
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
            console.error("Error writing file");
        });
    });
}

Product.prototype.fetchAll = function(callback) {
    fs.readFile(p, (err, data) => {
        if(err){
            callback([]);
        }
 
        callback(JSON.parse(data));
    })
}

exports.Product = Product;