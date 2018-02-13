'use strict';

const db = require('../lib/database');
const passhash = require('../lib/password');
const response = require('../lib/response');

const TABLE_NAME = 'PRESC_DRUG_SCHEDULE';
const PARAMS = 'PARAMS';

const TABLE_COLUMNS = {
    id: 'int',
    presc_details_id: 'int',
    day: 'string',
    ptime: 'time',
    intake_val: 'double',
    intake_size : 'string',
    intake_count: 'int'
};

exports.getPrescDrugDetailsSched = (id = '') => {
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

exports.createPrescriptionDetailSched = (data) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].createPrescriptionDetailSched [${PARAMS}]`, JSON.stringify({
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