const { response } = require('express');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

//Routes
const homePage = require('./routes/home');
const usersPage = require('./routes/users');
const feedPage = require('./routes/feed');



app.use(homePage);
app.use(usersPage);
app.use(feedPage);

//404 Page
app.use((request, response) => {
    response.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


app.listen(3000, () => {
    console.log('==========');
    console.log('Server listen to port 3000...');
    console.log('==========');
});