const express = require('express');
const router = express.Router();

const doctors = require('../../models/doctors');
const response = require('../../lib/response');

//api
router.get('/:id', function(req, res, next) {
    doctors.getDoctorById(req.params.id).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.get('/', function(req, res, next) {
    doctors.getDoctorsByName(req.query.name, req.query.limit).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.post('/verify', function(req, res, next) {
    doctors.verifyDoctorUserPass(req.body.email, req.body.password).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.post('/update', function(req,res,next){
    doctors.updateDoctorByEmail(req.body.data, req.body.email).then(data=>{
        if(data.data.affectedRows > 0) {
            res.json(data);
        } else {
            res.json(response.Error(null, "No data was updated.", 403));
        }
    }).catch(error=>{
        res.json(error);
    });
});

router.post('/create', function(req,res,next){
    doctors.createDoctor(req.body.data).then(data=>{
        if(data.data.affectedRows > 0) {
            res.json(data);
        } else {
            res.json(response.Error(null, "No data was created.", 403));
        }
    }).catch(error=>{
        res.json(error);
    });
});

router.post('/changepass', function(req,res,next){
    doctors.changePassword(req.body.password, req.body.email).then(data=>{
        if(data.data.affectedRows > 0) {
            res.json(data);
        } else {
            res.json(response.Error(null, "Password was not updated.", 403));
        }
    }).catch(error=>{
        res.json(error);
    });
});

module.exports = router;