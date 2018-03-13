const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
	res.render('patient/maps',{
        title: 'Location',
        user : req.session.user
    });
});

router.get('/pharmacy', function(req, res, next){
	res.render('patient/pharmacy',{
        title: 'Pharmacy',
        user : req.session.user
    });
});

module.exports = router;
