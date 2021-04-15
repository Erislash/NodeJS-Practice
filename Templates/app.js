const http = require('http');
const exp = require('express');
const app = exp();
const path = require('path');
const rootDir = require('./helpers/path');


// app.set('view engine', 'pug');
// app.set('views', 'views');
app.set('view engine', 'ejs');
app.set('views', 'views');



const {Router:adminRoutes, products} = require('./routes/admin');
const publicRoutes = require('./routes/shop');


app.use(exp.urlencoded({ extended: false }));
app.use(exp.static(path.join(rootDir, 'public')));

app.use('/admin', adminRoutes);
app.use(publicRoutes);


app.use((request, response, next) => {
    response.status(404).render('404.ejs', {pageTitle: 'Not found'});

});

app.listen(3000, () => console.log('Server Running on Port 3000...'));
