const express = require('express');
const router = express.Router();
var moment = require('moment');
router.get('/', function(req, res, next) {
    res.render('index',{
        //to be used in ejs as `title` variable
        title: 'Index Page',
        //to be used in ejs as `obj` variable
        obj: {
            notif: 25,
            rx: 20,
            date: moment().format('LL'),
            month: moment().format('MMMM')
        },

        //to be used in ejs as `array` variable
        array: [
            'Ken Crucillo',
            'Victor Rafols',
            'Jerome Patiga',
            'Jessica Agustin'
        ]
    });
});

module.exports = router;