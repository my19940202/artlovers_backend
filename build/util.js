"use strict";
exports.__esModule = true;
var mysql = require("mysql");
var pool = mysql.createPool({
    host: '106.13.166.35',
    user: 'root',
    password: 'kky@595876',
    database: 'xsb_test_db'
});
exports.query = function (sql) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }
            else {
                connection.query(sql, function (err, rows) {
                    if (err) {
                        reject({ err: err });
                    }
                    else {
                        resolve({ rows: rows });
                    }
                    connection.release();
                });
            }
        });
    });
};
