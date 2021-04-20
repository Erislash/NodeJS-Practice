const { response } = require('express');
const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//Routes
const homePage = require('./routes/home');
const feedPage = require('./routes/feed');
const {router:newPost} = require('./routes/newPost');

//Home page
app.use(homePage);
//All posts Page
app.use(feedPage);
//New post page
app.use('/admin', newPost);

//404 Page
app.use((request, response) => {
    response.status(404).render('404.ejs', {pageTitle:'Not found my friend'});
});


app.listen(3000, () => {
    console.log('\n\n==========');
    console.log('Server listen to port 3000...');
    console.log('==========\n\n');
});