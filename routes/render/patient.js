const express = require('express');
const router = express.Router();

const patient = require('../../models/patients');


router.get('/patientlist', function(req, res, next) {
    res.render('doctor/patientlist',{
        title: 'Patient List',
        user : req.session.user
    });
});

router.get('/patientinfo/:id', function(req, res, next) {
    patient.getPatientById(req.params.id).then(data=>{
        res.render('doctor/patientinfo',{
            title: 'Patient Profile',
            user : req.session.user,
            patient: data.data
        });
    });
});

router.get('/notif', function(req, res, next){
	res.render('doctor/notif',{
        title: 'Notification',
        user : req.session.user
    });
});


module.exports = router;