const express = require('express');
const router = express.Router();

const patient = require('../../models/patients');
const notif = require('../../models/notification');
const presc = require('../../models/presc');

router.get('/', function(req, res, next){
    notif.getPatientId(req.session.user.id).then(data=>{
        presc.getByPatient(req.session.user.email).then(datax=>{
            res.render('patient/dashboard',{
                title: 'Reseta',
                user : req.session.user,
                notif: data.data,
                presc: datax.data
            });
        });
    });
});

router.get('/profile', function(req, res, next){
    patient.getPatientById(req.session.user.id).then(data=>{
        res.render('patient/profile',{
            title: 'Profile',
            user : req.session.user,
            profile: data.data
        });
    });
});


module.exports = router;