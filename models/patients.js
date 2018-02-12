'use strict';

const db = require('../lib/database');
const passhash = require('../lib/password');
const response = require('../lib/response');

const TABLE_NAME = 'PATIENTS';
const PARAMS = 'PARAMS';

const TABLE_COLUMNS = {
    id: 'string',
    name: 'string',
    email: 'string',
    password: 'string',
    gender: 'int',
    date_of_birth : 'date',
    place_of_birth: 'string',
    height: 'int',
    weight: 'int',
    ethenticity: 'string',
    tel: 'string',
    address: 'string',
    postal_code: 'int',
    city: 'string',
    state_province: 'string',
    country: 'string',
    date_created: 'datetime'
};

exports.getPatientsByName = (name = '', limit) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].getPatientsByName [${PARAMS}]`, JSON.stringify({
        name: name,
        limit: limit
    }));
    return new Promise((resolve, reject) => {
        let cols = TABLE_COLUMNS;
        delete cols.password;
        let sql = `SELECT ${Object.keys(cols).join(',')} FROM ${TABLE_NAME} WHERE name LIKE ?`;
        if(limit){
            sql = `SELECT ${Object.keys(cols).join(',')} FROM ${TABLE_NAME} WHERE name LIKE ? LIMIT ${limit}`;
        }
        db.execute(sql,[`${name}%`]).then(rows=>{
            resolve(rows);
        }).catch(error=>{
            reject(error);
        });
    });
};

exports.getPatientById = (id) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].getPatientById [${PARAMS}]`, JSON.stringify({
        id: id
    }));
    return new Promise((resolve, reject) => {
        let cols = TABLE_COLUMNS;
        delete cols.password;
        let sql = `SELECT ${Object.keys(cols).join(',')} FROM ${TABLE_NAME} WHERE ?`;
        db.execute(sql,{id: id}).then(rows=>{
            resolve(rows);
        }).catch(error=>{
            reject(error);
        });
    });
};

exports.verifyPatientUserPass = (email, pass) =>{
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].verifyPatientUserPass [${PARAMS}]`, JSON.stringify({
        email: email,
        pass: `[PASS]`
    }));
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${TABLE_NAME} WHERE ?`;
        db.execute(sql,{email: email}).then(rows=>{
            if(rows.data.length > 0){
                let upass = rows.data[0].password;
                let salt = upass.substring(0, 16);
                let hash = upass.substring(16, upass.length);
                if(passhash.validate(pass, hash, salt)){
                    delete rows.data[0].password;
                    resolve(rows);
                }else{
                    reject(response.Error(null, 'Invalid Password', 400));    
                }
            }else{
                reject(response.Error(null, 'Data not found', 400));
            }
        }).catch(error=>{
            reject(error);
        });
    });
};

exports.changePassword = (password, email) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].changePassword [${PARAMS}]`, JSON.stringify({
        email: email,
        password: `[PASS]`
    }));
    let pass = passhash.hash(password);
    let data = {
        password: pass.salt + pass.passwordHash
    };
    return new Promise((resolve, reject)=>{
        let sql = `UPDATE ${TABLE_NAME} SET ? WHERE email = ?`;
        db.execute(sql, [data, email]).then(data=>{
            resolve(data);
        }).catch(error=>{
            reject(error);
        });
    });
};

exports.updatePatientByEmail = (data, email) => {
    let tdata = data;
    if(typeof tdata.password !== 'undefined') tdata.password = `[PASS]`
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].updatePatientByEmail [${PARAMS}]`, JSON.stringify({
        data: tdata,
        email: email
    }));
    if(typeof data.password !== 'undefined'){
        let pass = passhash.hash(data.password);
        data.password = pass.salt + pass.passwordHash;
    }
    return new Promise((resolve, reject) =>{
        let sql = `UPDATE ${TABLE_NAME} SET ? WHERE email = ?`;
        db.execute(sql, [data, email]).then(data=>{
            resolve(data);
        }).catch(error=>{
            reject(error);
        });
    });
};

exports.createPatient = (data, env) => {
    let tdata = data;
    if(typeof tdata.password !== 'undefined') tdata.password = `[PASS]`
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].createPatient [${PARAMS}]`, JSON.stringify({
        data: tdata
    }));
    if(typeof data.password !== 'undefined'){
        let pass = passhash.hash(data.password);
        data.password = pass.salt + pass.passwordHash;
    }
    return new Promise((resolve, reject)=>{
        db.execute(`INSERT INTO ${TABLE_NAME} SET ?`, data, env)
        .then((data)=>{
            resolve(data);
        }).catch((error)=>{
            reject(error);
        }); 
    });
};