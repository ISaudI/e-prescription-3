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

exports.getPrescriptionByDoctor = (email = '', limit, status) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].getPrescriptionByDoctor [${PARAMS}]`, JSON.stringify({
        email: email,
        limit: limit,
        status: status
    }));
    return new Promise((resolve, reject) => {
        let cols = TABLE_COLUMNS;
        let sql = `SELECT ${Object.keys(cols).join(',')} FROM ${TABLE_NAME} WHERE id = (SELECT id FROM doctors WHERE email = ?)`;
        if(status){
            sql += ` AND status = ${status}`;
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

exports.getPrescriptionByPatient = (email = '', limit, status) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].getPrescriptionByPatient [${PARAMS}]`, JSON.stringify({
        email: email,
        limit: limit,
        status: status
    }));
    return new Promise((resolve, reject) => {
        let cols = TABLE_COLUMNS;
        let sql = `SELECT ${Object.keys(cols).join(',')} FROM ${TABLE_NAME} WHERE id = (SELECT id FROM patients WHERE email = ?)`;
        if(status){
            sql += ` AND status = ${status}`;
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

exports.createPrescription = (data) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].createPrescription [${PARAMS}]`, JSON.stringify({
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

exports.voidPrescription = (id) => {
    let data = {
        status: 2
    }
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].voidPrescription [${PARAMS}]`, JSON.stringify({
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

exports.pushPrescription = (id) => {
    let data = {
        status: 1
    }
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].voidPrescription [${PARAMS}]`, JSON.stringify({
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