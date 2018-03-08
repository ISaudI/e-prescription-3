const express = require('express');
const router = express.Router();

const notif = require('../../models/notification');


router.get('/notif', function(req, res, next){
    notif.getPatientId(req.session.user.id).then(data=>{
        res.render('patient/notification',{
            title: 'Notification',
            user : req.session.user,
            notif: data.data
        });
    });
});






module.exports = router;