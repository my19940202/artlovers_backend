"use strict";
exports.__esModule = true;
var mysql = require("mysql");
var log4js = require("log4js");
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
                reject({ err: err });
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
    })["catch"](function (err) {
        console.error(err);
    });
};
log4js.configure({
    appenders: { dishes: { type: 'file', filename: 'dishes.log' } },
    categories: { "default": { appenders: ['dishes'], level: 'debug' } }
});
exports.mlog = function (msg, type) {
    if (type === void 0) { type = 'info'; }
    var logger = log4js.getLogger('dishes');
    if (type === 'info') {
        logger.info(msg);
    }
};
