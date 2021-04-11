const express = require('express');
const router = express.Router();
const rootPath = require('../helpers/rootPath');
const path = require('path');


router.get('/', (request, response) => {
    response.sendFile(path.join(rootPath, 'views', 'home.html'));
});
module.exports = router;