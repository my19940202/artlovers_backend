import * as mysql from 'mysql';
import * as log4js from 'log4js';

const pool = mysql.createPool({
    host     : '106.13.166.35',
    user     : 'root',
    password : 'kky@595876',
    database : 'xsb_test_db'
})

export const query = (sql: string) => {
    return new Promise(( resolve, reject ) => {
        pool.getConnection((err, connection) => {
            if (err) {reject({err});}
            else {
                connection.query(sql, ( err, rows) => {
                    if (err) {
                        reject({err});
                    } else {
                        resolve({rows});
                    }
                    connection.release();
                })
            }
        })
    }).catch(err => {
        console.error(err);
    })
}

log4js.configure({
    appenders: { dishes: { type: 'file', filename: 'dishes.log' } },
    categories: { default: { appenders: ['dishes'], level: 'debug' } }
});

export const mlog = (msg: string, type = 'info') => {
    const logger = log4js.getLogger('dishes');
    if (type === 'info') {
        logger.info(msg);
    }
}
