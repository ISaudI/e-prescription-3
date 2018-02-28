const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
	res.render('location/maps',{
        title: 'Location'
    });
});

module.exports = router;
// app.listen(3000);