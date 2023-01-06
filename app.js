
require("dotenv").config();
const dotenv = require('dotenv');
const express = require("express")
const app = express();
const mysql = require('mysql')
const shelfRouter = require('./router/shelfRoute')
const searchBookRouter = require('./router/searchBook');



app.listen(3000, () => {
  console.log("CONNTEECTED!!");
});


app.use('/shelf', shelfRouter);
app.use('/search', searchBookRouter);


module.exports = app;
