const mysql = require('mysql2');
require("dotenv").config();


const pool = mysql.createPool({
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
});

  module.exports = pool;
