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

// search results request
app.get("/api/listings", queryResults, (req,res)=>{
    db.query(req.sql, req.queryFilters, function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

// property details request given property_id
app.get("/api/listings/:id", queryProperty, (req,res)=>{
    db.query(req.sql, req.queryFilters, function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

// prevents SQL injection using special characters
function noSpecialCharacters(data){
    if(c = data.match(/[`'/\*%;\+\|\<\>=!\.\-]/)){ // special characters to avoid
        console.log(`Illegal character found: ${c} in ${data}`)
        return 0;
    }
    return 1;
}

//const filters = new Set(["q","ratemin","ratemax","lotmin","lotmax","furnished","curfew","type","occupancy","stay","a"]);

// set up query for list of properties given set of filters
// input validation: allowlisting, placeholders, illegal characters
function queryResults(req, res, next){
    req.sql = 'SELECT * FROM properties WHERE 1' // initial sql statement
    req.queryFilters=[]

    // loop through query array to build sql statement? is this safe?
    for (let key of Object.keys(req.query)){    // for each filter parameter in request

        // guard clause against special characters
        if (!noSpecialCharacters(req.query[key])){
            return res.status(400).json({ err: "Bad Request"});
        }

        // for each valid filter, add search key and value to sql statement
        switch(key) {
            case "q":
                req.sql += " AND property_name LIKE ?"
                req.query.q="%" + req.query.q + "%"
                req.queryFilters.push(req.query[key])
                break;
            case "ratemin":       
                req.sql += " AND rate >= ?"   // append filter to WHERE clause
                req.queryFilters.push(req.query[key])
                break;          
            case "lotmin":
                req.sql += " AND lot_area >= ?"   // append filter to WHERE clause
                req.queryFilters.push(req.query[key])
                break;
            case "ratemax":
                req.sql += " AND rate <= ?"
                req.queryFilters.push(req.query[key])
                break;
            case "lotmax":
                req.sql += " AND lot_area <= ?"
                req.queryFilters.push(req.query[key])
                break;
            case "furnished":
                req.sql += " AND furnishing = ?"
                req.queryFilters.push(["None","Semi","Full"][(req.query[key])%3])
                break;
            case "curfew":
                req.sql += " AND curfew = ?"
                req.queryFilters.push(req.query[key])
                break;
            case "type":
                req.sql += " AND lot_type = ?"
                req.queryFilters.push(["Condominium", "Dormitory", "Apartment", "Boarding House"][(req.query[key])%4])
                break;
            case "occupancy":
                req.sql += " AND occupancy <= ?"
                req.queryFilters.push([1,10][(req.query[key])])
                break;
            case "stay":
                req.sql += " AND min_month_stay <= ?"
                req.queryFilters.push(req.query[key])
                break;
            case "inclusions":
                // set operations?
                break;
            default: // key not in allowed filters
                console.log(`Illegal key: ${key}`)
                return res.status(400).json({ err: "Bad Request"});
        }
    }

    // log sql query statement
    console.log('request validated.')
    console.log(req.sql)      
    console.log(req.queryFilters)
    next();
}

// set up query for specific property given property_id
// input validation: placeholders, illegal characters
function queryProperty(req, res, next){ 
    req.sql = 'SELECT * FROM properties WHERE property_id = ?' // initial sql statement
    if (!noSpecialCharacters(req.params.id)){
        return res.status(400).json({ err: "Bad Request"});
    }
    req.queryFilters=[req.params.id]

    // log sql query statement
    console.log('request validated.')
    console.log(req.sql)      
    console.log(req.queryFilters)
    next();
}


app.listen(3000)