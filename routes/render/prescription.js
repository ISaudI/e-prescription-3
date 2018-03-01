const express = require('express');
const router = express.Router();

router.get('/:id', function(req, res, next) {
    

    res.render('prescription/add',{
        title: 'Prescription',
        user : req.session.user
    });
});

router.get('/', function(req, res, next) {
    res.render('doctor/prescriptionlist',{
        title: 'Prescription list',
        user : req.session.user
    });
});

module.exports = router;