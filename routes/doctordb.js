const express = require('express');
const router = express.Router();

const patients_model = require('../models/patients');

router.get('/', function(req, res, next){
	let patients = patients_model.getPatients();
    patients.then((patients)=>{
        var data = {
            patients: patient,
            title: 'dashboard'
        };
        res.render('doctordb/dashboard', data);
    }).catch((error)=>{
        console.log(error);
    });
});

module.exports = router;
// app.listen(3000);