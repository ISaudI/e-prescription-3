const express = require('express');
const router = express.Router();
var moment = require('moment');


router.get('/prescriptionlist', function(req, res, next){
	res.render('patient/prescriptionlist',{
        title: 'Rx Description',
        user : req.session.user,
        obj: {
            notif: 25,
            rx: 20,
            date: moment().format('LT'),
            month: moment().format('MMMM')
        },

    });
});
router.get('/maps', function(req, res, next){
	res.render('patient/maps',{
        user : req.session.user,
        title: 'Location'
    });
});

router.get('/pharmacy', function(req, res, next){
	res.render('patient/pharmacy',{
        title: 'Pharmacy',
        obj: {
            notif: 25,
            rx: 20,
            date: moment().format('LT'),
            month: moment().format('MMMM')
        }
    });
});

router.get('/notif', function(req, res, next){
	res.render('patient/notification',{
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