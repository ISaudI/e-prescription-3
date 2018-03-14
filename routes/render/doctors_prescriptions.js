const express = require('express');
const router = express.Router();

const presc = require('../../models/presc');
const prescdetails = require('../../models/presc_details');
const patients = require('../../models/patients');


router.get('/:id', function(req, res, next) {
    presc.getPresById(req.params.id).then(data=>{
        prescdetails.getDetailsById(req.params.id).then(pdata=>{
            res.render('doctor/prescadd',{
                title: 'Prescription',
                user : req.session.user,
                presc: data.data,
                prescdetails: pdata.data
            });
        });
    });
});

router.get('/', function(req, res, next) {
    presc.getByDoctor(req.session.user.email).then(data=>{
        patients.getPatientsByName(req.query.name, req.query.limit).then(pdata=>{
            res.render('doctor/prescriptionlist',{
                title: 'Prescription list',
                user : req.session.user,
                presc: data.data,
                patients: pdata.data
            });
        });
    });
});

module.exports = router;