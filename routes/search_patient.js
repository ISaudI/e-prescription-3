const express = require('express');
const router = express.Router();

const patients_model = require('../models/patients');

router.get('/', function(req, res, next) {
    let patients = patients_model.getPatientsByName(req.query.name);
    patients.then((patient)=>{
        var data = {
            patients:patient,
            title: 'dashboard',
            name: 'My Patients'
        };
        // let pdata = patient.map(row=>{
        //     return {
        //         value: row.name,
        //         data: row
        //     }
        // });

        res.render('doctor/dashboard',data);
    }).catch((error)=>{
        console.log(error);
    });
   
});

module.exports = router;