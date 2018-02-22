const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
	res.render('doctor/patientlist',{
        title: 'Patient List'
        
    });
});

module.exports = router;
// app.listen(3000);
