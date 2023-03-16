const express = require('express')
const app = express()
var cors = require('cors');
require("dotenv").config();
app.use(cors());
// const db = require('./database')
//app.use(express.static("public"))

app.get("/", (req,res)=>{ // home page
    res.sendFile('public/index.html',{root: __dirname})
})

app.get("/results", (req,res)=>{ // results page
    res.sendFile('public/results.html',{root: __dirname})
})

const pool = require('./db_config')

// search results request
app.get("/api/listings", queryResults, (req,res)=>{
    pool.query(req.sql, req.queryFilters, function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

// property details request given property_id
app.get("/api/listings/:id", queryResults, (req,res)=>{
    pool.query(req.sql, req.queryFilters, function(err, data, fields) {
        if (err) throw err;
        res.json({data})
    })
})

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

class keyword extends queryField{
    constructor(value){
        super(" AND (property_name LIKE ? OR street_address LIKE ? OR brgy LIKE ? OR city_municip LIKE ?)", value);
    }
    getFormatted(){
        return ["%"+this.value+"%","%"+this.value+"%","%"+this.value+"%","%"+this.value+"%"];
    }
}

class ratemin extends queryField{
    constructor(value){
        super(" AND rate >= ?", value);
    }
}

class ratemax extends queryField{
    constructor(value){
        super(" AND rate <= ?", value);
    }
}

class lotmin extends queryField{
    constructor(value){
        super(" AND lot_area >= ?", value);
    }
}

class lotmax extends queryField{
    constructor(value){
        super(" AND lot_area <= ?", value);
    }
}

class furnished extends queryField{
    constructor(value){
        super(" AND furnishing = ?", value);
    }
}
class curfew extends queryField{
    constructor(value){
        super(" AND curfew = ?", value);
    }
}
class type extends queryField{
    constructor(value){
        super(" AND lot_type = ?", value);
    }
}
class occupancy extends queryField{
    constructor(value){
        super(value==1 ? " AND occupancy > 1" : " AND occupancy <= 1", value);
    }
}
class stay extends queryField{
    constructor(value){
        super(" AND min_month_stay >= ? AND min_month_stay <= ?", value);
    }
}
class amenities extends queryField{
    constructor(value){
        super("", value);
    }
}
class propertyID extends queryField{
    constructor(value){
        super(" AND property_id = ?", value);
    }
}

class sqlQuery{
    sql="SELECT * FROM properties WHERE 1";
    queryFilters=[];
    limit = " LIMIT 20";

    constructor(fields){
        this.req = fields;
        this.q = new keyword(fields.q);
        this.ratemin = new ratemin(fields.ratemin);
        this.ratemax=new ratemax(fields.ratemax); 
        this.lotmin=new lotmin(fields.lotmin);
        this.lotmax=new lotmax(fields.lotmax);
        this.furnished=new furnished(["None","Semi","Full"][fields.furnished%3]); 
        this.curfew=new curfew(fields.curfew);
        this.type=new type(["Condominium", "Dormitory", "Apartment", "Boarding House"][fields.type%4]);
        this.occupancy=new occupancy([]);
        this.stay=new stay([[0,7,13][fields.stay], [6,12,24][fields.stay]]);
        this.a=new amenities(fields.a);

        this.id=new propertyID(fields.id);
    }

    noSpecialCharacters(data){
        let c='';
        if(c = data.match(/[`'/\*%;\+\|\<\>=!\.\-]/)){ // special characters to avoid
            console.log(`Illegal character found: ${c} in ${data}`)
            return 0;
        }
        return 1;
    }

    build(){
        for (let key of Object.keys(this.req)){    // append each filter parameter in request to sql statement
            // guard clause against special characters
            if (!this.noSpecialCharacters(String(this[key].getValue()))){
                return 400;
            }
            this.queryFilters=this.queryFilters.concat(this[key].getFormatted()); 
            this.sql+=this[key].getFilter();
        }
        this.sql+=this.limit; // add limit to pool query result
    }

    getSQL(){
        return this.sql;
    }

    getFilter(){
        return this.queryFilters;
    }
}

//const filters = new Set(["q","ratemin","ratemax","lotmin","lotmax","furnished","curfew","type","occupancy","stay","a"]);

// set up query for list of properties given set of filters
// input validation: allowlisting, placeholders, illegal characters
function queryResults(req, res, next){
    let sql = new sqlQuery({...req.query, ...req.params}); // include req.params
    if (sql.build()==400){
        return res.status(400).json({ err: "Bad Request"});
    }
    req.sql=sql.getSQL();
    req.queryFilters=sql.getFilter();

    // log sql query statement
    console.log('request validated.')
    console.log(req.sql)      
    console.log(req.queryFilters)
    next();
}


app.listen(3001)