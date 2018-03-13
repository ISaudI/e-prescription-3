const express = require('express');
const router = express.Router();

const doctor = require('../../models/doctors');
const notif = require('../../models/notification');
const presc = require('../../models/presc');

router.get('/', function(req, res, next){
    notif.getDoctorId(req.session.user.id).then(data=>{
        presc.getByDoctor(req.session.user.email).then(datax=>{
            res.render('doctor/dashboard',{
                title: 'Reseta',
                user : req.session.user,
                notif: data.data,
                presc: datax.data
            });
        });
    });
});

router.get('/profile', function(req, res, next){
    doctor.getDoctorById(req.session.user.id).then(data=>{
        res.render('doctor/profile',{
            title: 'Profile',
            user : req.session.user,
            profile: data.data
        });
    });
});


module.exports = router;