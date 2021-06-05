const path = require('path');
const postModel = require(path.join(__dirname, '..', 'models', 'posts.js'));

module.exports = function newPostUpload(request, response){
    postModel((Post) => {
        Post.findAll()
        .then(res => {
            let posts = [];
            for(val of res){
                posts.push(val.dataValues);
            }
            response.status(201).render('posts', {posts: posts});
        })
        .catch(err => {
            response.json({error: err});
        });
    });

}