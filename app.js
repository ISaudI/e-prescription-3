// app.js

const path = require('path');

//express
const express = require('express');

//session
const session = require('express-session');

const helmet = require('helmet');

//create instance
const app = express();

const mysql = require('./lib/database');

let mysql_con = mysql.connect();
mysql_con.then((data) => {
    console.log("Database connected", data);
}).catch((error) => {
    console.log("Database error", error);
});

//middleware to process POST data
const bodyParser = require('body-parser');

//set the template engine into ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);


app.use(helmet());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// serve the files out of ./public as our main files
app.use(express.static(path.join(__dirname, 'public')));

//declare session middleware
app.use(session({
    secret: 'this.is.super.secret.key', //make this unique and keep it somewhere safe
    saveUninitialized: false,
    resave: false
}));

app.use('/api/patient', require('./routes/api/patient'));
app.use('/api/doctors', require('./routes/api/doctors'));
app.use('/api/drugs', require('./routes/api/drugs'));
app.use('/api/pres', require('./routes/api/prescription'));
app.use('/api/notif', require('./routes/api/notification'));


const mw = require('./routes/middleware/auth');

app.use('/', require('./routes/render/index'));
app.use('/logout', require('./routes/api/logout'));
app.use('/patients/login', mw.isLogin, require('./routes/render/login_patient'));
app.use('/doctors/login', mw.isLogin, require('./routes/render/login_doctor'));
app.use('/doctor', mw.doctortRole, mw.isAuthenticated, require('./routes/render/patient'));
app.use('/patient', mw.patientRole, mw.isAuthenticated, require('./routes/render/doctor'));
app.use('/prescription', mw.isAuthenticated, require('./routes/render/prescription'));

module.exports = app;   