'use strict';

const db = require('../lib/database');
const passhash = require('../lib/password');
const response = require('../lib/response');
const moment = require('moment');

const TABLE_NAME = 'NOTIFICATION';
const PARAMS = 'PARAMS';

const TABLE_COLUMNS = {
    id: 'int',
    doctor_id: 'int',
    patient_id: 'int',
    /*
    PUSH=push request 
    VOID=void request
    */
    action_type: 'string',
    ok_flag: 'int',
    cancel_flag: 'int',
    doctor_id: 'int',
    date_approved: 'datetime',
    date_declined: 'datetime',
    date_created: 'datetime'
};

/**
 * 
 * @param {*} id integer
 */
exports.getId = (id) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].getId [${PARAMS}]`, JSON.stringify({
        id: id
    }));
    return new Promise((resolve, reject) => {
        let cols = TABLE_COLUMNS;
        let sql = `SELECT ${Object.keys(cols).join(',')} FROM ${TABLE_NAME} WHERE id = ?`;
        db.execute(sql,[id]).then(rows=>{
            resolve(rows);
        }).catch(error=>{
            reject(error);
        });
    });
};

/**
 * 
 * @param {*} limit integer
 */
exports.getAll = (limit) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].getId [${PARAMS}]`, JSON.stringify({
        limit: limit
    }));
    return new Promise((resolve, reject) => {
        let cols = TABLE_COLUMNS;
        let sql = `SELECT ${Object.keys(cols).join(',')} FROM ${TABLE_NAME}`;
        if(limit){
            sql += ` LIMIT ${limit}`;
        }
        db.execute(sql,[]).then(rows=>{
            resolve(rows);
        }).catch(error=>{
            reject(error);
        });
    });
};

/**
 * 
 * @param {*} id integer
 * @param {*} start_time Date with format 'yyyy-mm-dd'
 * @param {*} end_time Date with format 'yyyy-mm-dd'
 * @param {*} limit integer
 */
exports.getDoctorId = (id, start_time, end_time, limit) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].getDoctorId [${PARAMS}]`, JSON.stringify({
        id: id,
        limit: limit,
        start_time: start_time,
        end_time: end_time
    }));
    return new Promise((resolve, reject) => {
        let cols = TABLE_COLUMNS;
        let sql = `SELECT ${Object.keys(cols).join(',')} FROM ${TABLE_NAME} WHERE doctor_id = ?`;
        if(start_time && end_time){
            sql += `  AND (date(date_created) BETWEEN '${start_time}' AND '${end_time}')`;
        }else{
            if(start_time){
                sql += `  AND (DATE(date_created) => ${start_time})`;
            }
            if(end_time){
                sql += `  AND (DATE(date_created) <= ${end_time})`;
            }
        }
        if(limit){
            sql += ` LIMIT ${limit}`;
        }
        db.execute(sql,[id]).then(rows=>{
            resolve(rows);
        }).catch(error=>{
            reject(error);
        });
    });
};

/**
 * 
 * @param {*} id integer
 * @param {*} start_time Date with format 'yyyy-mm-dd'
 * @param {*} end_time Date with format 'yyyy-mm-dd'
 * @param {*} limit integer
 */
exports.getPatientId = (id, start_time, end_time, limit) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].getPatientId [${PARAMS}]`, JSON.stringify({
        id: id,
        limit: limit,
        start_time: start_time,
        end_time: end_time
    }));
    return new Promise((resolve, reject) => {
        let cols = TABLE_COLUMNS;
        let sql = `SELECT ${Object.keys(cols).join(',')} FROM ${TABLE_NAME} WHERE patient_id = ?`;
        if(start_time && end_time){
            sql += `  AND (date(date_created) BETWEEN '${start_time}' AND '${end_time}')`;
        }else{
            if(start_time){
                sql += `  AND (DATE(date_created) => ${start_time})`;
            }
            if(end_time){
                sql += `  AND (DATE(date_created) <= ${end_time})`;
            }
        }
        if(limit){
            sql += ` LIMIT ${limit}`;
        }
        db.execute(sql,[id]).then(rows=>{
            resolve(rows);
        }).catch(error=>{
            reject(error);
        });
    });
};

/**
 * 
 * @param {*} id  integer
 */
exports.approve = (id) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].approve [${PARAMS}]`, JSON.stringify({
        id: id
    }));
    return new Promise((resolve, reject) => {
        let sql = `UPDATE ${TABLE_NAME} SET ok_flag = 1, date_approved = ${moment().format('YYYY-MM-DD h:mm:ss')} WHERE id = ?`
        db.execute(sql,[id]).then(rows=>{
            resolve(rows);
        }).catch(error=>{
            reject(error);
        });
    });
};

/**
 * 
 * @param {*} id  integer
 */
exports.decline = (id) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].decline [${PARAMS}]`, JSON.stringify({
        id: id
    }));
    return new Promise((resolve, reject) => {
        let sql = `UPDATE ${TABLE_NAME} SET cancel_flag = 1, date_declined = ${moment().format('YYYY-MM-DD h:mm:ss')} WHERE id = ?`
        db.execute(sql,[id]).then(rows=>{
            resolve(rows);
        }).catch(error=>{
            reject(error);
        });
    });
};