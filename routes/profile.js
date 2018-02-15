const express = require('express');
const router = express.Router();

const doctors_model = require('../models/doctors');

router.get('/', function(req, res, next){
	let doctors = doctors_model.getDoctors();
    doctors.then((doctors)=>{
        var data = {
            doctors: doctor,
            title: 'profile'
        };
        res.render('doctors/dashboard', data);
    }).catch((error)=>{
        console.log(error);
    });
});

module.exports = router;
// app.listen(3000);