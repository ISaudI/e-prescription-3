'use strict';

var medicines_file = '../e-prescription/lib/tmp/doctors.json';
var fs = require('fs');

exports.getMedicines = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(medicines_file, 'utf8', (err, content) => {
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