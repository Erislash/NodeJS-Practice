const router = require('express').Router();
const path = require('path');

const newPostUpload = require(path.join(__dirname, '..', 'controllers', 'newPost.js'));
const allPosts = require(path.join(__dirname, '..', 'controllers', 'allPosts.js'));


router.get('/', (require, request) => {
    request.render('index.ejs');
});

router.get('/posts', allPosts);

router.get('/new-post', (require, request) => {
    request.render('new-post.ejs');
});
router.post('/new-post', newPostUpload);


module.exports = router;