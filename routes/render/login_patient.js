const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
	res.render('login/index',{
        title: 'Patient Login',
        config: {
            role: 0,
            url: '/api/patient/verify'
        }
    });
});

module.exports = router;