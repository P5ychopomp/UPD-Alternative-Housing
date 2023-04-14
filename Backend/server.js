const express = require('express');
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

app.get("/api/update", updateProperty, queryDB, (req,res)=>{ // should be POST
    pool.query(req.sql.getSQL(), req.sql.getValues(), function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

app.get("/api/insert", createProperty, queryDB, (req,res)=>{ // should be POST
    pool.query(req.sql.getSQL(), req.sql.getValues(), function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

app.get("/api/delete", ensureLoggedIn, deleteProperty, queryDB, (req,res)=>{ // should be POST
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

app.get("/api/updateAcc", ensureLoggedIn, updateAccount, queryDB, (req,res)=>{ // should be POST
    pool.query(req.sql.getSQL(), req.sql.getValues(), function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

app.get("/api/deleteAcc", ensureLoggedIn, deleteAccount, queryDB, (req,res)=>{ // should be POST
    pool.query(req.sql.getSQL(), req.sql.getValues(), function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

let ADMIN = 17; // let admin = user 17

class queryField{
    constructor(filter, value){
        this.filter=filter;
        this.value=value;
    }

    getValue(){
        return this.value;
    }

    getFormatted(){
        return this.value;
    }

    getFilter(){
        return this.filter;
    }
}

// for filters with multiple possible values (inclusions, type, etc.)
class mQueryField extends queryField{
    constructor(filter, value, select){
        super(filter, value);
        this.f=[];
        this.v=[];
        if (this.value != null){
            for (let key of this.value){
                this.f.push(this.filter);
                this.v=this.v.concat(select[key]);
            }
            this.filter='('+this.f.join(" OR ")+')';
            this.value = this.v;
        }
    }
}

class keyword extends queryField{
    constructor(value){
        super("(property_name LIKE ? OR street_address LIKE ? OR brgy LIKE ? OR city_municip LIKE ?)", value);
    }
    getFormatted(){
        return ["%"+this.value+"%","%"+this.value+"%","%"+this.value+"%","%"+this.value+"%"];
    }
}

class occupancy extends queryField{
    constructor(value){
        super(value==1 ? "occupancy > 1" : "occupancy <= 1", value);
    }
    getFormatted(){
        return [];
    }
}


class SQLQuery{
    queryValues=[];
    queryFilters=[];

    constructor(clause, fields){
        this.sql = clause;
        this.fields = fields;
    }

    noSpecialCharacters(data){
        let c='';
        if(c = data.match(/[`'/\*%;\+\|\<\>=!\.\-]/)){ // special characters to avoid
            console.log(`Illegal character found: ${c} in ${data}`)
            return 0;
        }
        return 1;
    }

    formatFilters(key){
        this.queryValues=this.queryValues.concat(this[key].getFormatted()); 
        this.queryFilters=this.queryFilters.concat(this[key].getFilter());
    }

    build(){
        for (let key of Object.keys(this.fields)){    // append each filter parameter in request to sql statement
            // guard clause against special characters
            if (!this.noSpecialCharacters(String(this[key].getValue()))){
                return 400;
            }
            this.formatFilters(key);
        }
    }

    getSQL(){
        return this.sql;
    }

    getValues(){
        return this.queryValues;
    }
}

class GetPropertyQuery extends SQLQuery{
    constructor(fields){
        super("SELECT * FROM properties ", fields);

        this.q = new keyword(fields.q);
        this.ratemin = new queryField("rate >= ?", fields.ratemin);
        this.ratemax=new queryField("rate <= ?", fields.ratemax);
        this.lotmin= new queryField("lot_area >= ?", fields.lotmin);
        this.lotmax= new queryField("lot_area <= ?", fields.lotmax);
        this.furnished=new mQueryField("furnishing = ?", fields.furnished, ["None","Semi","Full"]);
        this.curfew=new queryField("curfew = ?", fields.curfew);
        this.type=new mQueryField("lot_type = ?", fields.type, ["Condominium","Dormitory","Apartment","Boarding House"]);
        this.occupancy=new occupancy(fields.occupancy);
        this.stay=new mQueryField("(min_month_stay >= ? AND min_month_stay <= ?)", fields.stay, [[0,6],[7,12],[13,24]]);
        this.inclusions=new mQueryField("FIND_IN_SET(?, inclusion)", fields.inclusions, ["Electricity","Water","WiFi","Kitchen","Parking"]);

        this.pid=new queryField("property_id = ?", fields.pid);   // property ID
        this.lid= new queryField("landlord_id = ?", fields.lid);  // landlord ID

        this.page=new queryField("wala lang", fields.page); // pagination
    }
    formatFilters(key){
        if (key=="page")
            return;
        super.formatFilters(key);
    }
    build(){
        super.build();
        if (this.queryFilters.length)
            this.sql+="WHERE " + this.queryFilters.join(" AND ");
        if (this.page.getValue()!=null)
            this.sql+=" LIMIT 20 OFFSET " + 20*(this.page.getValue()-1); // add limit to db query result
    }
}

// NOTE: temporary schema combines room/rates table and property table into a single table (one rate per property)
class Property extends SQLQuery{ // used by update and insert property
    constructor(clause, fields){
        super(clause, fields);

        this.pid = new queryField("property_id",fields.pid);   // property ID
        this.pname = new queryField("property_name",fields.pname);
        this.sadd = new queryField("street_address",fields.add);
        this.brgy =new queryField("brgy",fields.brgy);
        this.city =new queryField("city_municip",fields.city);
        this.area = new queryField("lot_area",fields.area);
        this.rate = new queryField("rate",fields.rate);
        this.type = new queryField("lot_type",fields.type);
        this.minstay = new queryField("min_month_stay",fields.minstay);
        this.occupancy = new queryField("occupancy",fields.curfew);
        this.curfew = new queryField("curfew",fields.curfew);
        this.inclusion = new queryField("inclusion",fields.inclusion);
        this.other = new queryField("other_details",fields.other);
        this.img = new queryField("img_url",fields.img);
        this.date = new queryField("date_posted",fields.date);
        this.lid = new queryField("landlord_id",fields.lid);
    }
}

// NOTE: implement transactions
class UpdatePropertyQuery extends Property{
    constructor(fields){
        super("UPDATE properties SET ", fields);
    }
    formatFilters(key){
        if (key=="pid" || key=="lid") // these should only appear after WHERE keyword
            return;
        super.formatFilters(key);
    }
    build(){
        super.build();
        this.sql+=this.queryFilters.join("=?, ")+"=?";
        this.sql += " WHERE property_id = ?"
        this.queryValues.push(this.pid.getValue());
        if (this.lid.getValue()!=ADMIN){
            this.sql += " AND landlord_id = ?";
            this.queryValues.push(this.lid.getValue());
        }
    }
}

// NOTE: implement transactions
class CreatePropertyQuery extends Property{
    v = []; // array of question marks in "... VALUES (?,?,?,?)"
    constructor(fields){
        super("INSERT INTO properties ", fields);
    }
    formatFilters(key){
        super.formatFilters(key);
        this.v.push("?");
    }
    build(){
        super.build();
        this.sql +="(" + this.queryFilters.join(", ") + ") VALUES (" + this.v.join(",") + ")";
    }
}

class DeletePropertyQuery extends SQLQuery{
    constructor(fields){
        super("DELETE FROM properties ", fields);

        this.pid =  new queryField("property_id",fields.pid);   // property ID
        this.lid =  new queryField("landlord_id",fields.lid);   // landlord ID
    }
    formatFilters(){
        return; // delete has no filters
    }
    build(){
        super.build();
        this.sql += "WHERE property_id = ?";
        this.queryValues.push(this.pid.getValue());
        if (this.lid.getValue()!=ADMIN){ // authenticate further if not admin
            this.sql += " AND landlord_id = ?";
            this.queryValues.push(this.lid.getValue());
        }
    }
}

class GetAccountQuery extends SQLQuery{
    constructor(fields){
        super("SELECT id, last_name, first_name, email, profile_picture, facebook, phone FROM accounts ", fields);

        this.lid= new queryField("id = ?",fields.lid);  // landlord ID
    }
    build(){
        super.build();
        if (this.queryFilters.length)
            this.sql+="WHERE " + this.queryFilters.join(" AND ");
    }
}

class UpdateAccountQuery extends SQLQuery{
    constructor(fields){
        super("UPDATE accounts SET ", fields);

        this.lname = new queryField("last_name = ?",fields.lname);
        this.fname = new queryField("first_name = ?",fields.fname);
        this.img = new queryField("profile_picture = ?",fields.img);
        this.fb = new queryField("facebook = ?", fields.fb);
        this.phone = new queryField("phone = ?", fields.phone);
        this.lid = new queryField("id = ?",fields.lid);
    }
    formatFilters(key){
        if (key=="lid")     // lid not a filter; should appear after WHERE keyword
            return;
        super.formatFilters(key);
    }
    build(){
        super.build();
        this.sql+=this.queryFilters.join(", ");
        this.sql += " WHERE id = ?"
        this.queryValues.push(this.lid.getValue());
    }
}

class DeleteAccountQuery extends SQLQuery{
    constructor(fields){
        super("DELETE FROM accounts ", fields);

        this.lid =  new queryField("landlord_id",fields.lid);   // property ID
    }
    formatFilters(){
        return;     // delete has no filters
    }
    build(){
        super.build();
        this.sql += "WHERE id = ?"
        this.queryValues.push(this.lid.getValue());
    }
}

//const filters = new Set(["q","ratemin","ratemax","lotmin","lotmax","furnished","curfew","type","occupancy","stay","a"]);

// set up query for list of properties given set of filters
// input validation: allowlisting, placeholders, illegal characters
function queryProperty(req, res, next){
    req.sql = new GetPropertyQuery({...req.query, ...req.params}); // include req.params
    next();
}

function updateProperty(req, res, next){
    req.query.lid=req.user.id;
    req.sql = new UpdatePropertyQuery(req.query);
    next();
}

function createProperty(req, res, next){
    req.query.lid=req.user.id;
    req.sql = new CreatePropertyQuery(req.query);
    next();
}

function deleteProperty(req, res, next){
    req.query.lid=req.user.id;
    req.sql = new DeletePropertyQuery(req.query);
    next();
}

function queryAccount(req, res, next){
    //req.query.lid=req.user.id;
    req.sql = new GetAccountQuery({...req.query, ...req.params});
    next();
}

function updateAccount(req, res, next){
    if (!req.query.lid) // default to logged-in user
        req.query.lid=req.user.id;
    if (req.query.lid!=req.user.id && req.user.id!=ADMIN)     // requested change doesnt match logged in user
        return res.status(400).json({ err: "Bad Request"});
    //req.query.lid=req.user.id;
    req.sql = new UpdateAccountQuery(req.query);
    next();
}

function deleteAccount(req, res, next){
    if (!req.query.lid) // default to logged-in user
        req.query.lid=req.user.id;
    if (req.query.lid!=req.user.id && req.user.id!=ADMIN)     // requested change doesnt match logged in user or not admin
        return res.status(400).json({ err: "Bad Request"});
    //req.query.lid=req.user.id;
    req.sql = new DeleteAccountQuery(req.query);
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