const express = require('express');
const router = express.Router();
var moment = require('moment');

router.get('/', function(req, res, next) {
    res.render('draft/drafts',{

        //to be used in ejs as `title` variable
        title: 'Drafts Page',

        //to be used in ejs as `obj` variable
        obj: {
            date: moment().format("MMM D, YYYY")
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