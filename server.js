const express = require('express')
const app = express()
// const db = require('./database')
//app.use(express.static("public"))

app.get("/", (req,res)=>{ // home page
    res.sendFile('public/index.html',{root: __dirname})
})

app.get("/results", (req,res)=>{ // results page
    res.sendFile('public/results.html',{root: __dirname})
})

const mysql = require('mysql2');
const config = require('./db_config');
const db = mysql.createConnection(config.db);

app.get("/api/listings", (req,res)=>{ // test api
  let sql = `SELECT * FROM properties`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({data})
  })
})

app.listen(3000)