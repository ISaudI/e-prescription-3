const express = require('express');
const router = express.Router();

const presc = require('../../models/presc');
const presc_details = require('../../models/presc_details');

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

router.get('/', function(req, res, next) {
    res.render('patient/prescriptionlist',{
        title: 'Prescription list',
        user : req.session.user
    });
});

module.exports = router;
