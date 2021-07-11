const express = require('express');
const router = express.Router();

router.get("/", (request, response, next) => {
    request.session.count = request.session.count ? request.session.count + 1 : 1;
    request.session.TotalUsers = request.session.TotalUsers ? request.session.TotalUsers + 10 : 8;
    response.json({Message: 'Home Alabama', Times: request.session.count});
});


module.exports = router;
