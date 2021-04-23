const http = require('http');
const exp = require('express');
const app = exp();
const path = require('path');
const rootDir = require('./helpers/path');


app.set('view engine', 'ejs');
app.set('views', 'views');



const {Router:adminRoutes, products} = require('./routes/admin');
const publicRoutes = require('./routes/shop');
const {notFoundPages} = require('./controllers/404');


app.use(exp.urlencoded({ extended: false }));
app.use(exp.static(path.join(rootDir, 'public')));

app.use('/admin', adminRoutes);
app.use(publicRoutes);


app.use(notFoundPages);

app.listen(3000, () => console.log('Server Running on Port 3000...'));
