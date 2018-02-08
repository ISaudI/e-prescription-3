const express = require('express');
const router = express.Router();

router.get('/patient', function(req, res){
	res.render('patient/dashboard',{
        title: 'Dashboard',
        name: 'eRx'
    })
})

module.exports = router;
// app.listen(3000);