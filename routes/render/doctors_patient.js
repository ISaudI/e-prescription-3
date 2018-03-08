const express = require('express');
const router = express.Router();

const patient = require('../../models/patients');
const doctors = require('../../models/doctors');
const notif = require('../../models/notification');

router.get('/', function(req, res, next) {
    res.render('doctor/patientlist',{
        title: 'Patient List',
        user : req.session.user
    });
});

router.get('/:id', function(req, res, next) {
    patient.getPatientById(req.params.id).then(data=>{
        res.render('doctor/patientinfo',{
            title: 'Patient Profile',
            user : req.session.user,
            patient: data.data
        });
    });
});



module.exports = router;