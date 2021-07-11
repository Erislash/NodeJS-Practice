module.exports.signUpGET = (request, response) => {
    console.log('jkkkk');
    response.render('signup');
};

module.exports.signUpPOST = (request, response) => {
    console.log(request.body);
    const {email, password} = request.body;
    
    response.send('New sign up');
};


module.exports.loginGET = (request, response) => {
    response.render('login');
};

module.exports.loginPOST = (request, response) => {
    console.log(request.body);
    const {email, password} = request.body;

    response.send('New login');
};