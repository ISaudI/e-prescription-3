const express = require('express');
const router = express.Router();
var moment = require('moment');
router.get('/', function(req, res, next){
	res.render('notif/notification',{
        title: 'Notification',

        //to be used in ejs as `obj` variable
        obj: {
            notif: 25,
            rx: 20,
            date: moment().format('LT'),
            month: moment().format('MMMM')
        },

        //to be used in ejs as `array` variable
        array: [
            'Ken Crucillo',
            'Victor Rafols',
            'Jerome Patiga',
            'Jessica Agustin',
            'Agca Cruz'
        ]
    });
});

module.exports = router;
// app.listen(3000);