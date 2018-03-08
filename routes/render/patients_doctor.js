const express = require('express');
const router = express.Router();

const notif = require('../../models/notification');


router.get('/:id', function(req, res, next){
    notif.getPatientId(req.session.user.id).then(data=>{
        res.render('patient/doctorprofile',{
            title: 'Doctor Profile',
            user : req.session.user,
            notif: data.data
        });
    });
});


module.exports = router;
