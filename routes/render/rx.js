const express = require('express');
const router = express.Router();
var moment = require('moment');
router.get('/', function(req, res, next){
	res.render('rx/rx',{
        title: 'Rx Description',

        obj: {
            notif: 25,
            rx: 20,
            date: moment().format('LT'),
            month: moment().format('MMMM')
        },

    });
});

module.exports = router;
// app.listen(3000);