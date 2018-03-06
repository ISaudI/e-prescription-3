const express = require('express');
const router = express.Router();

const presc = require('../../models/presc');
const prescdetails = require('../../models/presc_details');


router.get('/:id', function(req, res, next) {
    presc.getPresById(req.params.id).then(data=>{
        prescdetails.getDetailsById(req.params.id).then(pdata=>{
            res.render('prescription/add',{
                title: 'Prescription',
                user : req.session.user,
                presc: data.data,
                prescdetails: pdata.data
            });
        });
    });
});

router.get('/', function(req, res, next) {
    res.render('doctor/prescriptionlist',{
        title: 'Prescription list',
        user : req.session.user
    });
});

module.exports = router;