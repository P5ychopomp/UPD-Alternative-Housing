const mysql = require('mysql2');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require("dotenv").config();


// Database options
const options = {
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  database: `${process.env.DB_DATABASE}`,
  password: `${process.env.DB_PASSWORD}`,
  waitForConnections: true,
  connectionLimit: 10,
  // maxIdle: 10,         // max idle connections, the default value is the same as `connectionLimit`
  // idleTimeout: 60000,  // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  port :`${process.env.DB_PORT}`
};

// Session storage options
const sessionOptions = {
  host: `${process.env.DB_HOST}`,
  port :`${process.env.DB_PORT}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_DATABASE}`,
	clearExpired: true,       	      // Whether or not to automatically check for and clear expired sessions:
	checkExpirationInterval: 900000, 	// How frequently expired sessions will be cleared; milliseconds:
	expiration: 86400000,             // (86400000ms=24HRS) The maximum age of a valid session; milliseconds:
	createDatabaseTable: true,        // Whether or not to create the sessions database table, if one does not already exist:
	endConnectionOnClose: true,       // Whether or not to end the database connection when the store is closed.
	                                  // The default value of this option depends on whether or not a connection was passed to the constructor.
	                                  // If a connection object is passed to the constructor, the default value for this option is false.
	disableTouch: false,              // Whether or not to disable touch:
	charset: "utf8mb4_bin",
	schema: {
		tableName: "sessions",
		columnNames: {
			session_id: "session_id",
			expires: "expires",
			data: "data",
		},
	},
};


const pool = mysql.createPool(options);
const sessionStore = new MySQLStore(sessionOptions, pool);

module.exports = {pool, sessionStore};
