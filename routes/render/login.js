const express = require('express');
const router = express.Router();

router.get('/doctor', function(req, res, next){
	res.render('login/index',{
        title: 'Doctor Login',
        role: 1
    });
});

router.get('/patient', function(req, res, next){
	res.render('login/index',{
        title: 'Patient Login',
        role: 0
    });
});

module.exports = router;