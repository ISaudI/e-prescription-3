'use strict';

const db = require('../lib/database');
const passhash = require('../lib/password');
const response = require('../lib/response');

const TABLE_NAME = 'DRUGS';
const PARAMS = 'PARAMS';

const TABLE_COLUMNS = {
    id: 'int',
    name: 'string',
    short_name: 'string',
    drug_category_id: 'int'
};

exports.getDrugByName = (name = '', limit, category) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].getDrugByName [${PARAMS}]`, JSON.stringify({
        name: name,
        limit: limit,
        category: category
    }));
    return new Promise((resolve, reject) => {
        let cols = TABLE_COLUMNS;
        let sql = `SELECT ${Object.keys(cols).join(',')} FROM ${TABLE_NAME} WHERE name LIKE ?`;
        if(category){
            sql += `  AND drug_category_id = ?`;
        }
        if(limit){
            sql += ` LIMIT ${limit}`;
        }
        db.execute(sql,[`${name}%`, category]).then(rows=>{
            resolve(rows);
        }).catch(error=>{
            reject(error);
        });
    });
};