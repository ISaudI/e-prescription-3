const express = require('express');
const router = express.Router();

const patient = require('../../models/patients');

//api
router.get('/:id', function(req, res, next) {
    patient.getPatientById(req.params.id).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.get('/', function(req, res, next) {
    patient.getPatientsByName(req.query.name, req.query.limit).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.post('/verify', function(req, res, next) {
    patient.verifyPatientUserPass(req.body.email, req.body.pass).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.post('/update', function(req,res,next){
    patient.updatePatientByEmail(req.body.data, req.body.email).then(data=>{
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
    patient.createPatient(req.body.data).then(data=>{
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
    patient.changePassword(req.body.password, req.body.email).then(data=>{
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