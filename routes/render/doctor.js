const express = require('express');
const router = express.Router();
var moment = require('moment');


router.get('/prescriptionlist', function(req, res, next){
	res.render('patient/prescriptionlist',{
        title: 'Rx Description',
        user : req.session.user
    });
});
router.get('/maps', function(req, res, next){
	res.render('patient/maps',{
        title: 'Location',
        user : req.session.user
    });
});

router.get('/pharmacy', function(req, res, next){
	res.render('patient/pharmacy',{
        title: 'Pharmacy',
        user : req.session.user
    });
});

router.get('/notif', function(req, res, next){
	res.render('patient/notification',{
        title: 'Notification',
        user : req.session.user
    });
});

router.get('/doctorprofile', function(req, res, next){
	res.render('patient/doctorprofile',{
        title: 'Doctor Profile',
        user : req.session.user
    });
});

router.get('/doctorlist', function(req, res, next){
	res.render('patient/doctorlist',{
        title: 'Doctor Profile',
        user : req.session.user
    });
});

router.get('/profile', function(req, res, next){
	res.render('patient/profile',{
        title: 'Profile',
        user : req.session.user
    });
});

module.exports = router;