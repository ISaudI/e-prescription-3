const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
	res.render('doctor/profile',{
        title: 'Dashboard',
        name: 'eRx'
    })
})

module.exports = router;
// app.listen(3000);