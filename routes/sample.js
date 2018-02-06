const express = require('express');
const router = express.Router();

const patients_model = require('../models/patients');

router.get('/', function(req, res, next) {
    let patients = patients_model.getPatients();
    patients.then((patient)=>{
        var data = {
            patients: patient
        };
        res.render('sample', data);
    }).catch((error)=>{
        console.log(error);
    });
});

module.exports = router;