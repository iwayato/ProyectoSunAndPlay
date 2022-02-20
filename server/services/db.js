const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {

    const connection = await mysql.createConnection(config.db);
    const [results, ] = await connection.execute(sql, params);

    connection.end(function(err) {
        if (err) {
          return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
    });

    return results;

}

module.exports = {
    query
}