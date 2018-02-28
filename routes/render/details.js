const express = require('express');
const router = express.Router();
var moment = require('moment');

router.get('/', function(req, res, next) {
    res.render('detail/details',{

        //to be used in ejs as `title` variable
        title: 'Details Page',

        //to be used in ejs as `obj` variable
    });
});

module.exports = router;