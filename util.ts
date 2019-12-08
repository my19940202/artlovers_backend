import * as mysql from 'mysql';
const pool = mysql.createPool({
    host     : '106.13.166.35',
    user     : 'root',
    password : 'kky@595876',
    database : 'xsb_test_db'
})

export const query = (sql: string) => {
    return new Promise(( resolve, reject ) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}
