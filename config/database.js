require("dotenv").config();
const mysql = require("mysql2/promise");
//const mysql = require('mysql');

const config = {
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  port: `32405`,
  password: `${process.env.DB_PASS}`,
  database: `${process.env.DB_NAME}`,
};

// const config = {
// host: `127.0.0.1`,
// user: `root`,
// port: `3306`,
// password: ``,
// database: `bookmark`,
// };

const pool = mysql.createPool(config);

module.exports = pool;
