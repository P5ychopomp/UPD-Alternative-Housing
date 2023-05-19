const express = require('express');
const bodyParser = require('body-parser').json();
const app = express();
require("dotenv").config();

const pool = require('./db_config').pool;
const session = require("express-session");
const bcrypt = require("bcrypt");
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var ensureLoggedIn = ensureLogIn();

var cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Session Storage
const sessionStore = require('./db_config').sessionStore;
app.use(
    session({
      // Key we want to keep secret which will encrypt all of our information
      secret: process.env.SESSION_SECRET,
      // Should we resave our session variables if nothing has changes
      resave: false,
      // Save empty value if there is no value
      saveUninitialized: false,
      // Use the mysql session store
      store: sessionStore
    })
  );

// User authentication routes
var authRouter = require('./routes/auth').router;
app.use('/', authRouter);

/*** DASHBOARD ***/

app.get("/dashboard", ensureLoggedIn, (req, res) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate');
    const user = req.user;
    res.send(`
        <meta http-equiv="Cache-Control" content="no-cache, no-store">
        <h1>DASHBOARD</h1>
        <ul>
        <li> Name: ${user.name} </li>
        <li> Email:${user.email} </li>
        </ul>
        <form action="/logout" method="post">
        <button class="logout" type="submit">Logout</button>
        </form>
        <form action="/api/delete?pid=250" method="post">
        <button class="logout" type="submit">Delete</button>
        </form>
    `)
});


/*** RESULTS PAGE ***/
app.get("/", (req,res)=>{ // home page
    res.send('<h1>Index Page</h1>')
})

app.get("/results", (req,res)=>{ // results page
    res.sendFile('public/results.html',{root: __dirname})
})


// search results request
app.get("/api/listings", queryProperty, queryDB, (req,res)=>{
    pool.query(req.sql.getSQL(), req.sql.getValues(), function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

// property details request given property_id
app.get("/api/listings/:pid", queryProperty, queryDB, (req,res)=>{
    pool.query(req.sql.getSQL(), req.sql.getValues(), function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

app.put("/api/listing/update/:pid", bodyParser, updateProperty, queryDB, (req,res)=>{ // should be POST
    pool.query(req.sql.getSQL(), req.sql.getValues(), function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

app.post("/api/listing/create", bodyParser, createProperty, queryDB, (req,res)=>{ // should be POST
    pool.query(req.sql.getSQL(), req.sql.getValues(), function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

app.delete("/api/listing/delete/:pid", bodyParser, deleteProperty, queryDB, (req,res)=>{ // should be POST
    pool.query(req.sql.getSQL(), req.sql.getValues(), function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

app.get("/api/accounts", queryAccount, queryDB, (req,res)=>{ // no need to authenticate?
    pool.query(req.sql.getSQL(), req.sql.getValues(), function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

// account details request given landlord_id
app.get("/api/accounts/:lid", queryAccount, queryDB, (req,res)=>{
    pool.query(req.sql.getSQL(), req.sql.getValues(), function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

app.put("/api/accounts/update/:lid", bodyParser, updateAccount, queryDB, (req,res)=>{ // should be POST
    pool.query(req.sql.getSQL(), req.sql.getValues(), function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

app.delete("/api/accounts/delete/:lid", deleteAccount, queryDB, (req,res)=>{ // should be POST
    pool.query(req.sql.getSQL(), req.sql.getValues(), function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

// import SQL construction classes
const { GetPropertyQuery, UpdatePropertyQuery, CreatePropertyQuery, DeletePropertyQuery } = require('./routes/propertyQuery');
const { GetAccountQuery, UpdateAccountQuery, DeleteAccountQuery } = require('./routes/accountQuery');

// MIDDLEWARE

function queryProperty(req, res, next){
    req.sql = new GetPropertyQuery({...req.query, ...req.params}); // include req.params
    next();
}

function updateProperty(req, res, next){
    req.body.lid=12;//change to req.user.id 
    req.body.pid=req.params.pid
    console.log(req.body)
    req.sql = new UpdatePropertyQuery(req.body);
    next();
}

function createProperty(req, res, next){
    req.body.lid=12;//change to req.user.id;
    req.sql = new CreatePropertyQuery(req.body);
    next();
}

function deleteProperty(req, res, next){
    req.body.lid=12;//change to req.user.id;
    req.body.pid=req.params.pid;
    req.sql = new DeletePropertyQuery(req.body);
    next();
}

function queryAccount(req, res, next){
    //req.query.lid=req.user.id;
    req.sql = new GetAccountQuery({...req.query, ...req.params});
    next();
}

function updateAccount(req, res, next){
    // if (!req.query.lid) // default to logged-in user
    //     req.params.lid=req.user.id;
    // if (req.params.lid!=req.user.id && req.user.id!=ADMIN)     // requested change doesnt match logged in user
    //     return res.status(400).json({ err: "Bad Request"});
    // replace with ^^ once authentication is fixed
    req.body.lid=req.params.lid;
    req.sql = new UpdateAccountQuery(req.body);
    next();
}

function deleteAccount(req, res, next){
    // if (!req.query.lid) // default to logged-in user
    //     req.params.lid=req.user.id;
    // if (req.params.lid!=req.user.id && req.user.id!=ADMIN)     // requested change doesnt match logged in user or not admin
    //     return res.status(400).json({ err: "Bad Request"});
    // replace with ^^ once authentication is fixed;
    req.sql = new DeleteAccountQuery(req.params);
    next();
}

function queryDB(req, res, next){
    if (req.sql.build()==400){
        return res.status(400).json({ err: "Bad Request"});
    }

    // log sql query statement
    console.log('request validated.')
    console.log(req.sql.getSQL())      
    console.log(req.sql.getValues())
    next();
}

app.listen(3001)