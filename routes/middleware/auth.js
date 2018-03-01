const patients = require('../../models/patients')
const doctors = require('../../models/doctors')

module.exports = {
    authDoctor : (req, res, next) => {
        doctors.verifyDoctorUserPass(req.body.email, req.body.password).then(data=>{
            req.session.user = data.data[0];
            res.locals.data = data;
            next();
        }).catch(error=>{
            res.json(error);
        });
    },
    
    authPatient : (req, res, next) => {
        patients.verifyPatientUserPass(req.body.email, req.body.pass).then(data=>{
            req.session.user = data.data[0];
            res.locals.data = data;
            next();
        }).catch(error=>{
            res.json(error);
        });
    },

    isAuthenticated: (req, res, next) => {
        if(req.session.user){
            next();
        }else{
            res.status(401).json({
                status: 0,
                msg: 'Unauthorized Access'
            })
        }
    }
}