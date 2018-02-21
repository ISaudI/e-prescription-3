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

exports.getDetailsById = (id = '') => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].getDetailsById [${PARAMS}]`, JSON.stringify({
        id: id
    }));
    return new Promise((resolve, reject) => {
        let cols = TABLE_COLUMNS;
        let sql = `
        SELECT
            rxd.*,
            d.name as drug_name,
            d.short_name as drug_short_name,
            d.drug_category_id as drug_category
        FROM PRESC_DETAILS rxd
        LEFT JOIN DRUGS d ON d.id = rxd.drug_id
        WHERE rxd.presc_id = ?
        `;
        db.execute(sql,[id]).then(rows=>{
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

exports.delete = (id) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].delete [${PARAMS}]`, JSON.stringify({
        id: id
    }));

    return new Promise((resolve, reject)=>{
        db.execute(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, id)
        .then((data)=>{
            resolve(data);
        }).catch((error)=>{
            reject(error);
        }); 
    });
}

