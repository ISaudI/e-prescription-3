const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next){
	res.render('doctor/notif',{
        title: 'Notification',
        user : req.session.user
    });
});


module.exports = router;
