const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
    res.render('login/index',{
        title: 'Doctor Login',
        config: {
            role: 1,
            url: '/api/doctors/verify'
        }
    });
});


module.exports = router;