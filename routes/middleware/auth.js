const patients = require('../../models/patients')
const doctors = require('../../models/doctors')

module.exports = {
    patientRole : (req, res, next) => {
        res.locals.role = 0;
        next();
    },
    doctortRole : (req, res, next) => {
        res.locals.role = 1;
        next();
    },
    authDoctor : (req, res, next) => {
        doctors.verifyDoctorUserPass(req.body.email, req.body.pass).then(data=>{
            req.session.user = data.data[0];
            req.session.user.role = 1;
            res.locals.data = data;
            next();
        }).catch(error=>{
            res.json(error);
        });
    },
    
    authPatient : (req, res, next) => {
        patients.verifyPatientUserPass(req.body.email, req.body.pass).then(data=>{
            req.session.user = data.data[0];
            req.session.user.role = 0;
            res.locals.data = data;
            next();
        }).catch(error=>{
            res.json(error);
        });
    },

    isAuthenticated: (req, res, next) => {
        if(!req.session.user){
            if(res.locals.role == 1){
                res.redirect('/doctors/login');
            }else{
                res.redirect('/patients/login');
            }
        }else{
            next();
        }
    },

    isLogin: (req, res, next) => {
        if(req.session.user){
            if(req.session.user.role == 1){
                res.redirect('/doctors/profile');
            }else{
                res.redirect('/patient/profile');
            }
        }else{
            next();
        }
    }
}