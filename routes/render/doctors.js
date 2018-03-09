const express = require('express');
const router = express.Router();

const doctor = require('../../models/doctors');

router.get('/profile', function(req, res, next){
    doctor.getDoctorById(req.session.user.id).then(data=>{
        res.render('doctor/profile',{
            title: 'Profile',
            user : req.session.user,
            profile: data.data
        });
    });
});


module.exports = router;