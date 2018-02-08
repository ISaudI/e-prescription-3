const express = require('express');
const router = express.Router();

router.get('/patient/dashboard', function(req, res){
	res.redirect('patient/dashboard')
})

module.exports = router;
// app.listen(3000);