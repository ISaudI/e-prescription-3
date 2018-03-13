const express = require('express');
const router = express.Router();

const presc = require('../../models/presc');
const presc_details = require('../../models/presc_details');
const doctors = require('../../models/doctors');


router.get('/:id', function(req, res, next){
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

router.get('/', function(req, res, next) {
    presc.getByPatient(req.session.user.email).then(data=>{
        doctors.getDoctorsByName(req.query.name, req.query.limit).then(drdata=>{
            res.render('patient/prescriptionlist',{
                title: 'Prescription list',
                user : req.session.user,
                presc: data.data,
                doctors: drdata.data
            });
        });
    });
});


module.exports = router;
