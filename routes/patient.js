const express = require('express');
const router = express.Router();

const patients = require('../models/patients');
//view
router.get('/search', (req, res, next)=>{
    patients.getPatients().then(data=>{
        res.render('patient', {
            title: 'Patient Search',
            patients: data
        })
    });
});

module.exports = router;