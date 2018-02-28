const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index',{

        //to be used in ejs as `title` variable
        title: 'Index Page',

        //to be used in ejs as `obj` variable
        obj: {
            notif: 25,
            rx: 20
        },

        //to be used in ejs as `array` variable
        array: [
            'Ken Crucillo',
            'Victor Rafols',
            'Jerome Patiga',
            'Jessica Agustin'
        ]
    });
});

router.get('/login', function(req, res, next){
	res.render('login',{
        title: 'Reseta'
    });
});

module.exports = router;