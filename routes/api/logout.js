const express = require('express');
const router = express.Router();

//api
router.post('/', function(req, res, next) {
    req.session.user = undefined;
    res.send();
});

module.exports = router;