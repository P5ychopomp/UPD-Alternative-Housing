const express = require('express')
const app = express()

//app.use(express.static("public"))

app.get("/", (req,res)=>{ // home page
    res.sendFile('public/index.html',{root: __dirname})
})

app.get("/results", (req,res)=>{ // results page
    res.sendFile('public/results.html',{root: __dirname})
})

app.get("/api/listings", (req,res)=>{ // test api
    if (req.query.key==='sunrise') //get query keyword
        res.json([{name: "sunrise dormitories", address: "street", area: 20, pricing: 5000},{name: "sunrise 2 dormitories", address: "street", area: 20, pricing: 5000}])
    res.end()
})

// Database Connection

const mysql = require('mysql2')
const connection = mysql.createConnection({
  // Hardcoded Values
  host: 'winhost',                  //replace with SQL server host
  user: 'wsl_root',                 //replace with SQL server username
  password: 'password',             
  database: 'alternative_housing',
  port: 3306
})

connection.connect()

// Sample Query
connection.query(
    'SELECT * FROM `properties` ',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
    //   console.log(fields); // fields contains extra meta data about results, if available
    }
  );

connection.end()

app.listen(3000)