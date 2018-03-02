'use strict';

const db = require('../lib/database');
const passhash = require('../lib/password');
const response = require('../lib/response');

const TABLE_NAME = 'PRESC';
const PARAMS = 'PARAMS';

const TABLE_COLUMNS = {
    id: 'int',
    patient_id: 'int',
    doctor_id: 'int',
    notes: 'string',
    status: 'int',
    date_created : 'datetime',
    date_modified: 'datetime'
};

exports.getByDoctor = (email = '', limit, status) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].getByDoctor [${PARAMS}]`, JSON.stringify({
        email: email,
        limit: limit,
        status: status
    }));
    return new Promise((resolve, reject) => {
        let cols = TABLE_COLUMNS;
        let sql = `SELECT ${Object.keys(cols).join(',')} FROM ${TABLE_NAME} WHERE doctor_id = (SELECT id FROM doctors WHERE email = ?)`;
        if(status){
            sql += ` AND status IN (${status})`;
        }
        if(limit){
            sql += ` LIMIT ${limit}`;
        }
        db.execute(sql,[email]).then(rows=>{
            resolve(rows);
        }).catch(error=>{
            reject(error);
        });
    });
};

exports.getByPatient = (email = '', limit, status) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].getByPatient [${PARAMS}]`, JSON.stringify({
        email: email,
        limit: limit,
        status: status
    }));
    return new Promise((resolve, reject) => {
        let cols = TABLE_COLUMNS;
        let sql = `SELECT ${Object.keys(cols).join(',')} FROM ${TABLE_NAME} WHERE patient_id = (SELECT id FROM patients WHERE email = ?)`;
        if(status){
            sql += ` AND status IN (${status})`;
        }
        if(limit){
            sql += ` LIMIT ${limit}`;
        }
        db.execute(sql,[email]).then(rows=>{
            resolve(rows);
        }).catch(error=>{
            reject(error);
        });
    });
};

exports.create = (data) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].create [${PARAMS}]`, JSON.stringify({
        data: data
    }));
    return new Promise((resolve, reject)=>{
        db.execute(`INSERT INTO ${TABLE_NAME} SET ?`, data)
        .then((data)=>{
            resolve(data);
        }).catch((error)=>{
            reject(error);
        }); 
    });
};

exports.void = (id) => {
    let data = {
        status: 2
    }
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].void [${PARAMS}]`, JSON.stringify({
        id: id,
        data: data
    }));
    return new Promise((resolve, reject) =>{
        let sql = `UPDATE ${TABLE_NAME} SET ? WHERE id = ?`;
        db.execute(sql, [data, id]).then(data=>{
            resolve(data);
        }).catch(error=>{
            reject(error);
        });
    });
};

exports.push = (id) => {
    let data = {
        status: 1
    }
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].push [${PARAMS}]`, JSON.stringify({
        id: id,
        data: data
    }));
    return new Promise((resolve, reject) =>{
        let sql = `UPDATE ${TABLE_NAME} SET ? WHERE id = ?`;
        db.execute(sql, [data, id]).then(data=>{
            resolve(data);
        }).catch(error=>{
            reject(error);
        });
    });
};

exports.getPresById = (id) => {
        console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].getPresById [${PARAMS}]`, JSON.stringify({
            id: id
        }));
        return new Promise((resolve, reject) => {
            let cols = TABLE_COLUMNS;
            let sql = `SELECT pres.id, pres.patient_id, pres.doctor_id, pres.notes, pres.status, pres.date_created, pres.date_modified,
            d.name as doctor_name, d.speciality, d.license_no, d.contact_no, p.name as patient_name, p.city, p.state_province
             FROM PRESC pres INNER JOIN doctors d ON d.id = pres.doctor_id INNER JOIN patients p ON p.id = pres.patient_id WHERE pres.id = ?`;
            db.execute(sql,[id]).then(rows=>{
                resolve(rows);
            }).catch(error=>{
                reject(error);
            });
        });
    };

// exports.addNotes = (id, data) => {
//     console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].push [${PARAMS}]`, JSON.stringify({
//         id: id,
//         data: data
//     }));
//     return new Promise((resolve, reject) =>{
//         let sql = `UPDATE ${TABLE_NAME} SET ? WHERE id = ?`;
//         db.execute(sql, [data, id]).then(data=>{
//             resolve(data);
//         }).catch(error=>{
//             reject(error);
//         });
//     });
// }; --->not sure if needed, baka sa pagpush na lang, i still don't know :((