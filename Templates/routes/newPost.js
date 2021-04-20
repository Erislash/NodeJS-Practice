const express = require('express');
const router = express.Router();
const path = require('path');
const posts = [];



router.get('/new-post', (request, response) => {
    response.render('newPost.ejs', {pageTitle:'Create  a new Post'});
});
router.post('/new-post', ({body:{title, body}}, response) => {
    response.status(301).redirect('/feed');
    console.log(body);
    posts.push({
        title,
        body
    });
});


module.exports = {router, posts};