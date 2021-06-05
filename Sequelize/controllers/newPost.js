const path = require('path');
const postModel = require(path.join(__dirname, '..', 'models', 'posts.js'));

module.exports = function newPostUpload(request, response){
    postModel((Post) => {
        Post.create({
            title: request.body.title,
            body: request.body.body
        })
        .then(res => {
            Post.findAll()
        .then(res => {
            for (post of res){

                console.log(post.dataValues);
            }
        })
        .catch(err => {
            console.log("Cannot fetch posts");
        });
            response.status(300).redirect('/');
        })
        .catch(err => {
            response.json({error: err});
        });
    });

}