// SQL statement construction for Accounts table

const { queryField, SQLQuery } = require('./sqlQuery');

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

module.exports = {
    GetAccountQuery,
    UpdateAccountQuery,
    DeleteAccountQuery
}