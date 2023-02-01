require("dotenv").config();
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

// const userBelongClubRouter = require("./router/club/userBelongRouter");
// const clubDetailInfoRouter = require("./router/club/clubDetailInfoRouter");
// const clubMemberRouter = require("./router/club/clubMemberRouter");
// const clubRequestRouter = require("./router/club/clubRequestRouter");
// const clubSearchRouter = require("./router/club/clubSearchRouter");
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

// app.use("/club/user", userBelongClubRouter);  // 사용자(userid)가 속한 책모임을 조회함   -----> 성공
// app.use("/club", clubDetailInfoRouter);       // 책 모임의 이름, 공지, 게시글 목록을 조회함 -----> 성공
// app.use("/club/member", clubMemberRouter);    // 책 모임의 소속 회원의 이름, 상태메시지, 현재 상태를 조회함 --> 성공
// app.use("/club/request", clubRequestRouter);  // 책 모임에 가입요청을 보냄   1-1일차   ---> 왜 안들어갈까요
// app.use("/club/search", clubSearchRouter);    // 책 모임을 검색하여 조회함   1-2일차   --> 게시글이 하나씩 가져와진다..
app.use("/club", postRouter)

module.exports = app;
