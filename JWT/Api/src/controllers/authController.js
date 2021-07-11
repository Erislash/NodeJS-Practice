require('dotenv').config();
const Router = require('express').Router();
const path = require('path');
const userController = require(path.join(__dirname, '..', 'models', 'users.js'));
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

Router.get('/profile', (request, response, next) => {
    const token = request.headers['x-access-token'];
    if(!token) return response.status(401).json({
        auth:false,
        msg:'No token provided'
    });
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjI1MDcyMjM2LCJleHAiOjE2MjUxNTg2MzZ9.-2qC2xqEbfhjiXzT02FK00fkRslQ5_UhAb05b9V8OXM
    const decoded = JWT.verify(token, process.env.SECRET_KEY);
    userController((User) => {
        
        User.findOne({
            where: {
              id: decoded.id
            }
        })
        .then(result => {
            return response.json({'Message': 'Login Success', User: result.dataValues});
        })
        .catch();
    });
    

    
});


Router.post('/signup', (request, response, next) => {
    const {username, email, password} = request.body;
    
    userController((User) => {
        bcrypt.genSalt(10)
        .then(salt => {
            bcrypt.hash(password, salt)
            .then((hash) => {
                User.create({username, email, password:hash})
                .then(result => {
                    const newId = result.dataValues.id;
                    const token = JWT.sign({id : newId}, process.env.SECRET_KEY, {
                        expiresIn: 60 * 60 * 24
                    });


                    response.json({'Message':'ALL OK', auth:true, token:token});
                })
                .catch();
            })
            .catch();
        })
        .catch();
    });

    
});

Router.post('/signin', (request, response, next) => {
    response.json({'Message': 'Sign In'});
});





module.exports = Router;
