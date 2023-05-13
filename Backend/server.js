const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3030;
const pool = require("./db_config").pool;
const session = require("express-session");
const bcrypt = require("bcrypt");
var ensureLogIn = require("connect-ensure-login").ensureLoggedIn;
var ensureLoggedIn = ensureLogIn();
var passport = require('passport');

var cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: ["https://upd-alternative-housing.vercel.app", "http://localhost:3000", "https://upd-alternative-housing.netlify.app"],
    optionsSuccessStatus: 200,
  })
);
app.use(express.urlencoded({ extended: false }));

// Session Storage
const sessionStore = require("./db_config").sessionStore;
var sess = {
  // Key we want to keep secret which will encrypt all of our information
  secret: process.env.SESSION_SECRET,
  // Should we resave our session variables if nothing has changes
  resave: true,
  // Save empty value if there is no value
  saveUninitialized: true,
  // Use the mysql session store
  store: sessionStore,
  cookie: {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  },
};
if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

// User authentication routes
var authRouter = require("./routes/auth");
app.use("/", authRouter);

/*** DASHBOARD ***/
app.get("/dashboard", ensureLoggedIn, (req, res) => {
  res.send({ message: 100 });
});

/*** RESULTS PAGE ***/
app.get("/", (req, res) => {
  // home page
  res.send("<h1>Index Page</h1>");
});

app.get("/results", (req, res) => {
  // results page
  res.sendFile("public/results.html", { root: __dirname });
});

// search results request
app.get("/api/listings", queryResults, queryDB, (req, res) => {
  pool.query(
    req.sql.getSQL(),
    req.sql.getValues(),
    function (err, data, fields) {
      if (err) throw err;
      res.json({ data });
    }
  );
});

// property details request given property_id
app.get("/api/listings/:pid", queryResults, queryDB, (req, res) => {
  pool.query(
    req.sql.getSQL(),
    req.sql.getValues(),
    function (err, data, fields) {
      if (err) throw err;
      res.json({ data });
    }
  );
});

app.get("/api/update", updateProperty, queryDB, (req, res) => {
  // should be POST
  pool.query(
    req.sql.getSQL(),
    req.sql.getValues(),
    function (err, data, fields) {
      if (err) throw err;
      res.json({ data });
    }
  );
});

app.get("/api/insert", insertProperty, queryDB, (req, res) => {
  // should be POST
  pool.query(
    req.sql.getSQL(),
    req.sql.getValues(),
    function (err, data, fields) {
      if (err) throw err;
      res.json({ data });
    }
  );
});

app.get("/api/delete", ensureLoggedIn, deleteProperty, queryDB, (req, res) => {
  // should be POST
  pool.query(
    req.sql.getSQL(),
    req.sql.getValues(),
    function (err, data, fields) {
      if (err) throw err;
      res.json({ data });
    }
  );
});

app.get("/api/accounts", ensureLoggedIn, queryAccount, queryDB, (req, res) => {
  pool.query(
    req.sql.getSQL(),
    req.sql.getValues(),
    function (err, data, fields) {
      if (err) throw err;
      res.json({ data });
    }
  );
});

app.get(
  "/api/updateAcc",
  ensureLoggedIn,
  updateAccount,
  queryDB,
  (req, res) => {
    // should be POST
    pool.query(
      req.sql.getSQL(),
      req.sql.getValues(),
      function (err, data, fields) {
        if (err) throw err;
        res.json({ data });
      }
    );
  }
);

app.get(
  "/api/deleteAcc",
  ensureLoggedIn,
  deleteAccount,
  queryDB,
  (req, res) => {
    // should be POST
    pool.query(
      req.sql.getSQL(),
      req.sql.getValues(),
      function (err, data, fields) {
        if (err) throw err;
        res.json({ data });
      }
    );
  }
);

app.get("/api/accounts", ensureLoggedIn, queryAccount, queryDB, (req, res) => {
  pool.query(
    req.sql.getSQL(),
    req.sql.getValues(),
    function (err, data, fields) {
      if (err) throw err;
      res.json({ data });
    }
  );
});

app.post(
  "/api/updateAcc",
  ensureLoggedIn,
  updateAccount,
  queryDB,
  (req, res) => {
    // should be POST
    pool.query(
      req.sql.getSQL(),
      req.sql.getValues(),
      function (err, data, fields) {
        if (err) throw err;
        res.json({ data });
      }
    );
  }
);

app.post(
  "/api/deleteAcc",
  ensureLoggedIn,
  deleteAccount,
  queryDB,
  (req, res) => {
    // should be POST
    pool.query(
      req.sql.getSQL(),
      req.sql.getValues(),
      function (err, data, fields) {
        if (err) throw err;
        res.json({ data });
      }
    );
  }
);

class queryField {
  constructor(filter, value) {
    this.filter = filter;
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  getFormatted() {
    return this.value;
  }

  getFilter() {
    return this.filter;
  }
}

class keyword extends queryField {
  constructor(value) {
    super(
      "(property_name LIKE ? OR street_address LIKE ? OR brgy LIKE ? OR city_municip LIKE ?)",
      value
    );
  }
  getFormatted() {
    return [
      "%" + this.value + "%",
      "%" + this.value + "%",
      "%" + this.value + "%",
      "%" + this.value + "%",
    ];
  }
}

class ratemin extends queryField {
  constructor(value) {
    super("rate >= ?", value);
  }
}

class ratemax extends queryField {
  constructor(value) {
    super("rate <= ?", value);
  }
}

class lotmin extends queryField {
  constructor(value) {
    super("lot_area >= ?", value);
  }
}

class lotmax extends queryField {
  constructor(value) {
    super("lot_area <= ?", value);
  }
}

class furnished extends queryField {
  constructor(value) {
    super("furnishing = ?", value);
  }
}
class curfew extends queryField {
  constructor(value) {
    super("curfew = ?", value);
  }
}
class type extends queryField {
  constructor(value) {
    super("lot_type = ?", value);
  }
}
class occupancy extends queryField {
  constructor(value) {
    super(value == 1 ? "occupancy > 1" : "occupancy <= 1", value);
  }
}
class stay extends queryField {
  constructor(value) {
    super("min_month_stay >= ? AND min_month_stay <= ?", value);
  }
}
class amenities extends queryField {
  constructor(value) {
    super("FIND_IN_SET(?, inclusion)", value);
    this.sql = [];
    this.v = [];
    if (this.value != null) {
      for (let key of this.value) {
        this.sql.push(this.filter);
        this.v.push(
          ["Electricity", "Water", "WiFi", "Kitchen", "Parking"][key]
        );
      }
      this.filter = this.sql.join(" OR ");
    }
  }
  getFormatted() {
    return this.v;
  }
}
class propertyID extends queryField {
  constructor(value) {
    super("property_id = ?", value);
  }
}

class landlordID extends queryField {
  constructor(value) {
    super("landlord_id = ?", value);
  }
}

class updateField extends queryField {
  constructor(filter, value) {
    super(filter + " = ?", value);
  }
}

class Property {
  constructor(fields) {
    this.pid = new queryField(fields.pid); // property ID
    this.pname = new queryField(fields.pname);
    this.add = new queryField(fields.add);
    this.brgy = new queryField(fields.brgy);
    this.city = new queryField(fields.city);
    this.area = new queryField(fields.city);
    this.type = new queryField(fields.type);
    this.minstay = new queryField(fields.minstay);
    this.curfew = new queryField(fields.curfew);
    this.other = new queryField(fields.other);
    this.img = new queryField(fields.img);
    this.date = new queryField(fields.date);
    this.lid = new queryField(fields.lid);
  }
}

class sqlQuery {
  queryValues = [];
  queryFilters = [];

  constructor(clause, fields) {
    this.sql = clause;
    this.req = fields;
  }

  noSpecialCharacters(data) {
    let c = "";
    if ((c = data.match(/[`'/\*%;\+\|\<\>=!\.\-]/))) {
      // special characters to avoid
      console.log(`Illegal character found: ${c} in ${data}`);
      return 0;
    }
    return 1;
  }

  formatFilters(key) {
    this.queryValues = this.queryValues.concat(this[key].getFormatted());
    this.queryFilters = this.queryFilters.concat(this[key].getFilter());
  }

  build() {
    for (let key of Object.keys(this.req)) {
      // append each filter parameter in request to sql statement
      // guard clause against special characters
      console.log(key);
      if (!this.noSpecialCharacters(String(this[key].getValue()))) {
        return 400;
      }
      this.formatFilters(key);
    }
  }

  getSQL() {
    return this.sql;
  }

  getValues() {
    return this.queryValues;
  }
}

class propertyQuery extends sqlQuery {
  constructor(fields) {
    super("SELECT * FROM properties ", fields);

    this.q = new keyword(fields.q);
    this.ratemin = new ratemin(fields.ratemin);
    this.ratemax = new ratemax(fields.ratemax);
    this.lotmin = new lotmin(fields.lotmin);
    this.lotmax = new lotmax(fields.lotmax);
    this.furnished = new furnished(
      ["None", "Semi", "Full"][fields.furnished % 3]
    );
    this.curfew = new curfew(fields.curfew);
    this.type = new type(
      ["Condominium", "Dormitory", "Apartment", "Boarding House"][
        fields.type % 4
      ]
    );
    this.occupancy = new occupancy([]);
    this.stay = new stay([[0, 7, 13][fields.stay], [6, 12, 24][fields.stay]]);
    this.a = new amenities(fields.a);

    this.pid = new propertyID(fields.pid); // property ID
    this.lid = new landlordID(fields.lid); // landlord ID

    this.page = new queryField("wala lang", fields.page); // pagination
  }
  formatFilters(key) {
    if (key == "page") return;
    super.formatFilters(key);
  }
  build() {
    super.build();
    if (this.queryFilters.length)
      this.sql += "WHERE " + this.queryFilters.join(" AND ");
    if (this.page.getValue() != null)
      this.sql += " LIMIT 20 OFFSET " + 20 * (this.page.getValue() - 1); // add limit to db query result
  }
}

// NOTE: implement transactions; can this be refactored using class Property?
class updateQuery extends sqlQuery {
  constructor(fields) {
    super("UPDATE properties SET ", fields);

    this.pid = new queryField("property_id", fields.pid); // property ID
    this.pname = new updateField("property_name", fields.pname);
    this.add = new updateField("street_address", fields.add);
    this.brgy = new updateField("municip_brgy", fields.brgy);
    this.city = new updateField("city", fields.city);
    this.area = new updateField("lot_area", fields.city);
    this.type = new updateField("lot_type", fields.type);
    this.minstay = new updateField("min_stay", fields.minstay);
    this.curfew = new updateField("curfew", fields.curfew);
    this.other = new updateField("other_details", fields.other);
    this.img = new updateField("img_url", fields.img);
    this.date = new updateField("date_posted", fields.date);
    this.lid = new queryField("landlord_id", fields.lid);
  }
  formatFilters(key) {
    if (key == "pid" || key == "lid") return;
    super.formatFilters(key);
  }
  build() {
    super.build();
    this.sql += this.queryFilters.join(", ");
    this.sql += " WHERE property_id = ? AND landlord_id = ?";
    this.queryValues.push(this.pid.getValue());
    this.queryValues.push(this.lid.getValue());
  }
}

// NOTE: implement transactions; can this be refactored using class Property?
class insertQuery extends sqlQuery {
  v = [];
  constructor(fields) {
    super("INSERT INTO properties ", fields);

    this.pid = new queryField("property_id", fields.pid); // property ID
    this.pname = new queryField("property_name", fields.pname);
    this.add = new queryField("street_address", fields.add);
    this.brgy = new queryField("municip_brgy", fields.brgy);
    this.city = new queryField("city", fields.city);
    this.area = new queryField("lot_area", fields.city);
    this.type = new queryField("lot_type", fields.type);
    this.minstay = new queryField("min_stay", fields.minstay);
    this.curfew = new queryField("curfew", fields.curfew);
    this.other = new queryField("other_details", fields.other);
    this.img = new queryField("img_url", fields.img);
    this.date = new queryField("date_posted", fields.date);
    this.lid = new queryField("landlord_id", fields.lid);
  }
  formatFilters(key) {
    super.formatFilters(key);
    this.v.push("?");
  }
  build() {
    super.build();
    this.sql +=
      "(" +
      this.queryFilters.join(", ") +
      ") VALUES (" +
      this.v.join(",") +
      ")";
  }
}

class deleteQuery extends sqlQuery {
  constructor(fields) {
    super("DELETE FROM properties ", fields);

    this.pid = new queryField("property_id", fields.pid); // property ID
    this.lid = new queryField("landlord_id", fields.lid); // property ID
  }
  formatFilters(key) {
    if (key == "pid" || key == "lid") return;
    super.formatFilters(key);
  }
  build() {
    super.build();
    this.sql += this.queryFilters.join(", ");
    this.sql += " WHERE property_id = ? AND landlord_id = ?";
    this.queryValues.push(this.pid.getValue());
    this.queryValues.push(this.lid.getValue());
  }
}

class accountQuery extends sqlQuery {
  constructor(fields) {
    super("SELECT * FROM accounts ", fields);

    this.lid = new queryField("id = ?", fields.lid); // landlord ID
  }
  build() {
    super.build();
    if (this.queryFilters.length)
      this.sql += "WHERE " + this.queryFilters.join(" AND ");
  }
}

class updateAccountQuery extends sqlQuery {
  constructor(fields) {
    super("UPDATE accounts SET ", fields);

    this.lname = new updateField("last_name", fields.lname);
    this.fname = new updateField("first_name", fields.fname);
    this.img = new updateField("profile_picture", fields.img);
    this.fb = new updateField("facebook", fields.fb);
    this.phone = new updateField("phone", fields.phone);
    this.lid = new updateField("id", fields.lid);
  }
  formatFilters(key) {
    if (key == "lid") return;
    super.formatFilters(key);
  }
  build() {
    super.build();
    this.sql += this.queryFilters.join(", ");
    this.sql += " WHERE id = ?";
    this.queryValues.push(this.lid.getValue());
  }
}

class deleteAccountQuery extends sqlQuery {
  constructor(fields) {
    super("DELETE FROM accounts ", fields);

    this.lid = new queryField("landlord_id", fields.lid); // property ID
  }
  formatFilters(key) {
    if (key == "lid") return;
    super.formatFilters(key);
  }
  build() {
    super.build();
    this.sql += this.queryFilters.join(", ");
    this.sql += " WHERE id = ?";
    this.queryValues.push(this.lid.getValue());
  }
}

//const filters = new Set(["q","ratemin","ratemax","lotmin","lotmax","furnished","curfew","type","occupancy","stay","a"]);

// set up query for list of properties given set of filters
// input validation: allowlisting, placeholders, illegal characters
function queryResults(req, res, next) {
  req.sql = new propertyQuery({ ...req.query, ...req.params }); // include req.params
  next();
}

function updateProperty(req, res, next) {
  req.query.lid = req.user.id;
  req.sql = new updateQuery(req.query);
  next();
}

function insertProperty(req, res, next) {
  req.query.lid = req.user.id;
  req.sql = new insertQuery(req.query);
  next();
}

function deleteProperty(req, res, next) {
  req.query.lid = req.user.id;
  req.sql = new deleteQuery(req.query);
  next();
}

function queryAccount(req, res, next) {
  req.query.lid = req.user.id;
  req.sql = new accountQuery(req.query);
  next();
}

function updateAccount(req, res, next) {
  req.query.lid = req.user.id;
  req.sql = new updateAccountQuery(req.query);
  next();
}

function deleteAccount(req, res, next) {
  req.query.lid = req.user.id;
  req.sql = new deleteAccountQuery(req.query);
  next();
}

function queryDB(req, res, next) {
  if (req.sql.build() == 400) {
    return res.status(400).json({ err: "Bad Request" });
  }

  // log sql query statement
  console.log("request validated.");
  console.log(req.sql.getSQL());
  console.log(req.sql.getValues());
  next();
}

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
