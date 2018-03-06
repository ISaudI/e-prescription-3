const express = require('express');
const router = express.Router();

router.get('/patientlist', function(req, res, next) {
    res.render('doctor/patientlist',{
        title: 'Patient List',
        user : req.session.user
    });
});

router.get('/patientinfo', function(req, res, next) {
    res.render('doctor/patientinfo',{
        title: 'Patient Profile',
        user : req.session.user
    });
});

router.get('/notif', function(req, res, next){
	res.render('doctor/notif',{
        title: 'Notification',
        user : req.session.user
    });
});


module.exports = router;