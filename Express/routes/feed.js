const express = require('express');
const router = express.Router();
const rootPath = require('../helpers/rootPath');
const path = require('path');


router.get('/feed', (request, response) => {
    response.sendFile(path.join(rootPath, 'views', 'feed.html'));
});
module.exports = router;