const express = require('express');
const router = express.Router();
const rootPath = require('../helpers/rootPath');
const path = require('path');


router.get('/users', (request, response) => {
    response.sendFile(path.join(rootPath, 'views', 'users.html'));
});
module.exports = router;