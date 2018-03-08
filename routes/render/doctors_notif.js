const express = require('express');
const router = express.Router();


router.get('/notif', function(req, res, next){
	res.render('doctor/notif',{
        title: 'Notification',
        user : req.session.user
    });
});


module.exports = router;
