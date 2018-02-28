const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
	res.render('reseta/login',{
        title: 'Reseta'
    });
});

module.exports = router;
// app.listen(3000);