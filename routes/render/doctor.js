const express = require('express');
const router = express.Router();

const patient = require('../../models/patients');
const presc = require('../../models/presc');
const presc_details = require('../../models/presc_details');
const notif = require('../../models/notification');

router.get('/prescriptionlist/:id', function(req, res, next){
    presc.getPresById(req.params.id).then(data=>{
        presc_details.getDetailsById(req.params.id).then(detsdata=>{
            res.render('patient/prescriptionlist',{
                title: 'Rx Description',
                user : req.session.user,
                presc: data.data,
                prescdetails: detsdata.data
            });
        });
    });
});

router.get('/maps', function(req, res, next){
	res.render('patient/maps',{
        title: 'Location',
        user : req.session.user
    });
});

router.get('/pharmacy', function(req, res, next){
	res.render('patient/pharmacy',{
        title: 'Pharmacy',
        user : req.session.user
    });
});

router.get('/notif', function(req, res, next){
    notif.getPatientId(req.session.user.id).then(data=>{
        res.render('patient/notification',{
            title: 'Notification',
            user : req.session.user,
            notif: data.data
        });
    });
});

router.get('/doctorprofile', function(req, res, next){
    notif.getPatientId(req.session.user.id).then(data=>{
        res.render('patient/doctorprofile',{
            title: 'Doctor Profile',
            user : req.session.user,
            notif: data.data
        });
    });
});

router.get('/doctorlist', function(req, res, next){
	res.render('patient/doctorlist',{
        title: 'Doctor Profile',
        user : req.session.user
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

router.get('/prescription/:id', function(req, res, next){
    presc.getPresById(req.params.id).then(data=>{
        presc_details.getDetailsById(req.params.id).then(detailsdata=>{
            res.render('patient/prescription',{
                title: 'Prescription',
                user : req.session.user,            
                presc: data.data,
                prescdetails: detailsdata.data
            });
        });
    });
});
module.exports = router;