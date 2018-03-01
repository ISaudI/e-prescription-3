const express = require('express');
const router = express.Router();

const patient = require('../../models/patients');

router.get('/patientlist', function(req, res, next) {
    res.render('doctor/patientlist',{
        title: 'Patient List',
        user: req.session.user
    });
});

router.get('/patientinfo', function(req, res, next) {
    res.render('doctor/patientinfo',{
        title: 'Patient Profile',
        user: req.session.user
    });
});


module.exports = router;