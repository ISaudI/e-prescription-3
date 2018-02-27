const express = require('express');
const router = express.Router();

router.get('/patientlist', function(req, res, next) {
    res.render('doctor/patientlist',{
        title: 'Patient List'
    });
});

router.get('/patientinfo', function(req, res, next) {
    res.render('doctor/patientinfo',{
        title: 'Patient Info'
    });
});

module.exports = router;