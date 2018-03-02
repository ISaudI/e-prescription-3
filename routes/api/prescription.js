const express = require('express');
const router = express.Router();

const presc = require('../../models/presc');
const presc_details = require('../../models/presc_details');

// -----> start of api for prescription
router.post('/create', function(req, res, next) {
    presc.create(req.body).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.post('/void', function(req, res, next) {
    presc.void(req.body.id).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.post('/push', function(req, res, next) {
    presc.push(req.body.id).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.get('/doctor', function(req, res, next) {
    presc.getByDoctor(req.query.email, req.query.limit, req.query.status).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.get('/patient', function(req, res, next) {
    presc.getByPatient(req.query.email, req.query.limit, req.query.status).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

// -----> end


// -----> start of api in prescription details

router.post('/details/create', function(req, res, next) {
    presc_details.create(req.body).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.post('/details/delete', function(req, res, next) {
    presc_details.delete(req.body.id).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.get('/details', function(req, res, next) {
    presc_details.getDetailsById(req.query.id).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

//get prescription by its id
router.get('/:id', function(req, res, next) {
        presc.getPresById(req.params.id).then(data=>{
            res.json(data);
        }).catch(error=>{
            res.json(error);
        });
    });

router.post('/details/update', function(req, res, next) {
    presc_details.update(req.body.id, req.body.data).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

// router.post('/update', function(req, res, next) {
//     presc_details.update(req.body.id, req.body.data).then(data=>{
//         res.json(data);
//     }).catch(error=>{
//         res.json(error);
//     });
// }); -->i think not need, iisipin ko pa pano ko iaadd yung notes
// -----> end

module.exports = router;