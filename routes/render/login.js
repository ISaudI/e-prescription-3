const express = require('express');
const router = express.Router();

const patient = require('../../models/patients');

router.get('/doctor', function(req, res, next){
    res.render('login/index',{
        title: 'Doctor Login',
        config: {
            role: 1,
            url: '/api/doctors/verify'
        }
    });
});

router.get('/patient', function(req, res, next){
	res.render('login/index',{
        title: 'Patient Login',
        config: {
            role: 0,
            url: '/api/patient/verify'
        }
    });
});

module.exports = router;