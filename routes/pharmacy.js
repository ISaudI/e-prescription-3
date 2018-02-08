const express = require('express');
const router = express.Router();



router.get('/', function(req, res) {
    
    res.render("patient/pharmacy", 
        
        {
            title: "pharmacy",
            body: "you're here."
        }
    );
});

module.exports = router;