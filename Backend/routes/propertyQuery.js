// SQL statement construction for Properties table

const { queryField, mQueryField, SQLQuery } = require('./sqlQuery');

const ADMIN = 17; // let admin = user 17

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

module.exports = {
    GetPropertyQuery,
    UpdatePropertyQuery,
    CreatePropertyQuery,
    DeletePropertyQuery
}