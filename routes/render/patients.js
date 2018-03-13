const express = require('express');
const router = express.Router();

const patient = require('../../models/patients');

router.get('/', function(req, res, next){
    res.render('patient/dashboard',{
        title: 'Reseta',
        user : req.session.user,
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