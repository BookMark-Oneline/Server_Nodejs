//import dotenv from "dotenv";
//dotenv.config();
const dotenv = require("dotenv");
const session = require("express-session");
const express = require("express");
const app = express();
const mysql = require("mysql");
const shelfRouter = require("./router/myShelf/shelfRoute");
const searchBookRouter = require("./router/myShelf/searchBook");
const timerRouter = require("./router/myShelf/timerRoute");
const bookRegisterRouter = require("./router/myShelf/bookRegisterRouter");
const bookDeleteRouter = require("./router/myShelf/bookDeleteRouter");
const postRouter = require("./router/club/postRoute");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

app.listen(3000, () => {
  console.log("Connected!!!");
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(express.json());

app.use((err, req, res, next) => {
  const { status } = err;
  res.status(status).send("ERROR !! ");
});

//해당 미들웨어가 사이트로 들어오는 모두를 기억.
app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/shelf", shelfRouter);
app.use("/search", searchBookRouter);
app.use("/timer", timerRouter);
app.use("/register", bookRegisterRouter);
app.use("/delete", bookDeleteRouter);
app.use("/club/post", postRouter);

module.exports = app;
