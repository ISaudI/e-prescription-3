const express = require('express');
const router = express.Router();

const patient = require('../../models/drug');

//api
router.get('/', function(req, res, next) {
    patient.getDrugByName(req.query.name, req.query.limit, req.query.category).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

module.exports = router;