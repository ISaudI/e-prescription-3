const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
	res.render('doctor/profile',{
        title: 'Profile',
        name: 'Profile'
    })
})

module.exports = router;
// app.listen(3000);