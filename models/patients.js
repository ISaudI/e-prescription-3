'use strict';

var patients_file = '../e-prescription/lib/tmp/patients.json';
var fs = require('fs');

exports.getPatients = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(patients_file, 'utf8', (err, content) => {
            if(err) {
                reject(err);
            } else {
                try {
                    resolve(JSON.parse(content));
                } catch(err) {
                    reject(err);
                }
            }
        });
    });
};