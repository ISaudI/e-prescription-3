const express = require('express');
const router = express.Router();

router.get('/:id', function(req, res, next) {
    res.render('prescription/add',{
        title: 'Prescription'
    });
});

module.exports = router;