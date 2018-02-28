const express = require('express');
const router = express.Router();

router.get('/:id', function(req, res, next) {
    res.render('prescription/add',{
        title: 'Prescription'
    });
});

router.get('/', function(req, res, next) {
    res.render('doctor/prescriptionlist',{
        title: 'Prescription list'
    });
});

module.exports = router;