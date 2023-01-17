require("dotenv").config();
const mysql = require("mysql2/promise");
//const mysql = require('mysql');

<<<<<<< HEAD
 const config = {
   host: `${process.env.DB_HOST}`,
   user: `${process.env.DB_USER}`,
   port: `3306`,
   password: `${process.env.DB_PASS}`,
  database: `${process.env.DB_NAME}`,
 };
//const config = {
 // host: `127.0.0.1`,
 // user: `root`,
 // port: `3306`,
 // password: `PW`,
  //database: `bookmark`,

  // 여러 쿼리를 ';'를 기준으로 한번에 보낼 수 있게한다. 15일 새벽 추가 eon,
  // https://zionh.tistory.com/26 참고
  // multipleStatements: true
  
=======
const config = {
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  port: `3306`,
  password: `${process.env.DB_PASS}`,
  database: `${process.env.DB_NAME}`,
};

>>>>>>> ddd718eebbd63f35bd2d371592ea506d3c88b06b
const pool = mysql.createPool(config);

module.exports = pool;
