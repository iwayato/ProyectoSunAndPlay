const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test',
})

app.get('/', (req, res) => {
    const sqlInsert = "INSERT INTO data (name, info) VALUES ('cat', 'dog');"
    db.query(sqlInsert, (err, result) => {
        res.send('hola');
    });
    
});

app.listen(3001, () => {
    console.log('running on port 3001');
});