const express = require('express');
const router = express.Router();

const patient = require('../../models/patients');

router.get('/doctor', function(req, res, next){
    patient.getPatientsByName().then(data=>{
        res.render('login/index',{
            title: 'Doctor Login',
            role: 1,
            patient: data.data
        });
    });
});

router.get('/patient', function(req, res, next){
	res.render('login/index',{
        title: 'Patient Login',
        role: 0
    });
});

module.exports = router;