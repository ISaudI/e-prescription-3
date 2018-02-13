const express = require('express');
const router = express.Router();

const patient = require('../models/patients');

//api
router.get('/getAllPatients', function(req, res, next) {
    patient.getPatients().then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

module.exports = router;