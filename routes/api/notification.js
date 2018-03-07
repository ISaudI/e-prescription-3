const express = require('express');
const router = express.Router();

const notif = require('../../models/notification');

//api
router.get('/', function(req, res, next) {
    notif.getAll(req.query.limit).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.get('/:id', function(req, res, next) {
    if(isNaN(req.params.id)){
        res.json({status:0, msg: 'Invalid request'})
    }
    notif.getId(req.params.id).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.get('/doctor/:id', function(req, res, next) {
    if(isNaN(req.params.id)){
        res.json({status:0, msg: 'Invalid request'})
    }
    notif.getDoctorId(req.params.id, req.query.start_time, req.query.end_time, req.query.limit).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.get('/patient/:id', function(req, res, next) {
    if(isNaN(req.params.id)){
        res.json({status:0, msg: 'Invalid request'})
    }
    notif.getPatientId(req.params.id, req.query.start_time, req.query.end_time, req.query.limit).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.get('/prescription/:id', function(req, res, next) {
    if(isNaN(req.params.id)){
        res.json({status:0, msg: 'Invalid request'})
    }
    notif.getPrescriptionId(req.params.id, req.query.start_time, req.query.end_time).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.post('/patient/approve', function(req, res, next) {
    notif.approve(req.body.id).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.post('/patient/decline', function(req, res, next) {
    notif.decline(req.body.id).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

module.exports = router;