const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
	res.render('doctor/createrx',{
        title: 'Create Rx'
        
    });
});

module.exports = router;