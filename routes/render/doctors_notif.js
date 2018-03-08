const express = require('express');
const router = express.Router();

const notif = require('../../models/notification');


router.get('/', function(req, res, next){
    notif.getDoctorId(req.session.user.id).then(data=>{
        res.render('doctor/notif',{
            title: 'Notification',
            user : req.session.user,
            notif: data.data
        });
    });    
});


module.exports = router;
