// SQL statement construction for Properties table
const  express = require("express");
const router = express.Router()

const { queryField, mQueryField, SQLQuery } = require('./sqlQuery');
const { upload, getSignedImgUrl, imgUpload, deleteImg } = require('../s3Bucket');
const pool = require('../db_config').pool;

var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var ensureLoggedIn = ensureLogIn();

const ADMIN = 17; // let admin = user 17

// search results request
router.get("/", queryProperty, queryDB, (req,res, next)=>{
    pool.query(req.sql.getSQL(), req.sql.getValues(), function(err, data, fields) {
        if (err) throw err;
        //res.json({data})
        req.data=data
        next()
    })
}, getSignedImgUrl)

// property details request given property_id
router.get("/:pid", queryProperty, queryDB, (req,res, next)=>{
    pool.query(req.sql.getSQL(), req.sql.getValues(), function(err, data, fields) {
        if (err) throw err;
        //res.json({data})
        req.data=data
        next()
    })
}, getSignedImgUrl)

router.put("/update/:pid", ensureLoggedIn, upload.single('img'), (req,res, next)=>{ 
    pool.query("SELECT img_url FROM properties WHERE property_id = ?",[req.params.pid], function(err, data, fields) {
        if (err) throw err;
        //req.imgName = data[0].img_url
        next()
    })}, imgUpload, updateProperty, queryDB, (req,res)=>{
    pool.query(req.sql.getSQL(), req.sql.getValues(), function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

router.post("/create", ensureLoggedIn, upload.single('img'), imgUpload, createProperty, queryDB, (req,res)=>{
    console.log(req.file);
    pool.query(req.sql.getSQL(), req.sql.getValues(), function(err, data, fields) {
        if (err) throw err;
        res.json(req.sql.fields)
    })
})

router.delete("/delete/:pid", ensureLoggedIn, (req,res, next)=>{
    pool.query("SELECT img_url FROM properties WHERE property_id = ?",[req.params.pid], function(err, data, fields) {
        if (err) throw err;
        req.imgName = data[0].img_url
        next()
    })}, deleteImg, deleteProperty, queryDB, (req,res)=>{ 
    pool.query(req.sql.getSQL(), req.sql.getValues(), function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

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

class Property extends SQLQuery{ // used by update and create property
    constructor(clause, fields){
        super(clause, fields);

        this.pid = new queryField("property_id",fields.pid);   // property ID
        this.pname = new queryField("property_name",fields.pname);
        this.sadd = new queryField("street_address",fields.sadd);
        this.brgy =new queryField("brgy",fields.brgy);
        this.city =new queryField("city_municip",fields.city); 
        this.area = new queryField("lot_area",fields.area);
        this.rate = new queryField("rate",fields.rate);
        this.type = new queryField("lot_type",fields.type);
        this.bed = new queryField("num_bedrooms", fields.bed);
        this.bath = new queryField("num_bathrooms", fields.bath);
        this.minstay = new queryField("min_month_stay",fields.minstay);
        this.occupancy = new queryField("occupancy",fields.curfew);
        this.curfew = new queryField("curfew",fields.curfew);
        this.other = new queryField("other_details",fields.other);
        this.img = new queryField("img_url",fields.img);
        this.furnishing = new queryField("furnishing", fields.furnishing);
        this.date = new queryField("date_posted",fields.date);
        this.lid = new queryField("landlord_id",fields.lid);
        if (fields.inclusion){
            let f = [];
            for (let v=0; v<fields.inclusion.length;v++){
                console.log(fields.inclusion[v])
                f.push(["Electricity","Water","WiFi","Kitchen","Parking"][fields.inclusion[v]])
            }
            this.inclusion = new queryField("inclusion",f.join(","));
        }
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

function queryProperty(req, res, next){
    req.sql = new GetPropertyQuery({...req.query, ...req.params}); // include req.params
    next();
}

function updateProperty(req, res, next){
    console.log(req.body);
    req.body.lid=req.session.passport.user // logged in user id
    req.body.pid=req.params.pid
    console.log(req.body)
    req.sql = new UpdatePropertyQuery(req.body);
    next();
}

function createProperty(req, res, next){
    req.body.lid=req.session.passport.user // logged in user id
    req.sql = new CreatePropertyQuery(req.body);
    next();
}

function deleteProperty(req, res, next){
    req.body.lid=req.session.passport.user // logged in user id
    req.body.pid=req.params.pid;
    req.sql = new DeletePropertyQuery(req.body);
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

module.exports = router;