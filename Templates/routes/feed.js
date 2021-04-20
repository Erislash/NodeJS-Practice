const express = require('express');
const router = express.Router();
const rootPath = require('../helpers/rootPath');
const path = require('path');
const {posts} = require('./newPost');


router.get('/feed', (request, response) => {
    response.render('feed.ejs', {posts, pageTitle:'Posts'});
});
module.exports = router;