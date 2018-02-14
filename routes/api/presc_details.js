'use strict';

const db = require('../lib/database');
const passhash = require('../lib/password');
const response = require('../lib/response');

const TABLE_NAME = 'PRESC_DETAILS';
const PARAMS = 'PARAMS';

const TABLE_COLUMNS = {
    id: 'int',
    notes: 'string',
    drug_id: 'int'
};

exports.getPrescriptionDetailsById = (id = '') => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].getPatientsByName [${PARAMS}]`, JSON.stringify({
        name: name
    }));
    return new Promise((resolve, reject) => {
        let cols = TABLE_COLUMNS;
        let sql = `
        SELECT
            rxds.id as sched_id,
            rxd.*,
            d.name as drug_name,
            d.short_name as drug_short_name,
            d.drug_category_id as drug_category,
            rxds.day,
            rxds.ptime,
            rxds.intake_val,
            rxds.intake_size,
            rxds.intake_count
        FROM PRESC_DETAILS rxd
        LEFT JOIN DRUGS d ON d.id = rxd.drug_id
        LEFT JOIN PRESC_DRUG_SCHEDULE rxds ON rxds.presc_details_id = rxd.id
        WHERE rxd.presc_id = ?
        `;
        db.execute(sql,[id]).then(rows=>{
            resolve(rows);
        }).catch(error=>{
            reject(error);
        });
    });
};

exports.createPrescriptionDetails = (data) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].createPrescriptionDetails [${PARAMS}]`, JSON.stringify({
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