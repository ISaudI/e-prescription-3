const express = require('express');
const router = express.Router();
var moment = require('moment');

router.get('/', function(req, res, next) {
    res.render('notif/notification',{

        //to be used in ejs as `title` variable
        title: 'Notification Page',

        //to be used in ejs as `obj` variable
        obj: {
            date: moment().format('ll')
        },
        array: [
            'Ken Crucillo',
            'Victor Rafols',
            'Jerome Patiga',
            'Jessica Agustin'
        ]
    });
});

module.exports = router;