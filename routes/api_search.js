const express = require('express');
const router = express.Router();

const patients_model = require('../models/patients');

router.get('/', function(req, res, next) {
    let patients = patients_model.getPatients();
    patients.then((patient)=>{
        let patients = patient.map(row=>{
            return {
                value: row.name,
                data: row
            }
        });
        res.json(patients);
    }).catch((error)=>{
        console.log(error);
    });
});

module.exports = router;