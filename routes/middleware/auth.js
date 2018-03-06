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
            console.log(res.locals);
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
        req.session.user = {
            "id": 1,
            "img": null,
            "name": "Kendrick Crucillo",
            "email": "kendrick004@gmail.com",
            "gender": 1,
            "date_of_birth": null,
            "place_of_birth": "San Pedro",
            "height": 178,
            "weight": 171.961,
            "ethenticity": "FILIPINO",
            "tel": "111-11-11",
            "address": null,
            "postal_code": 4023,
            "city": "San Pedro",
            "state_province": "Laguna",
            "country": "Philippines",
            "date_created": "2018-02-12T02:36:52.000Z"
        };
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