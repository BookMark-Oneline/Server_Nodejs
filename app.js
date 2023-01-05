const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// DB 연결
// var db = require("./lib/db");

//API KEY 값
// HTTP Header 영역에 Client ID, Client Secret 을 전송
//
const client_id = "Ifa5qitpcs9USMk6LSKM";
const client_secret = "yJNDtDZKbb";

app.get("/search/book", (req, res) => {
  const api_url =
    "https://openapi.naver.com/v1/search/book?query=" +
    encodeURI(req.query.query);
  console.log(api_url);
  var request = require("request");
  const options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  request.get(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
      const data = JSON.parse(body);
      const myData = data.items;
      console.log(myData);
      // for (var i = 0; i < myData.length; i++) {
      //const title = myData[i].title;
      //const link = myData[i].link;
      // const image = myData[i].image;
      // const author = myData[i].author;
      // const publisher = myData[i].publisher;
      // const isbn = myData[i].isbn;
      // const description = myData[i].description;
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

// 타이머 시작
app.post("/timer/start/:user_id/:book_id", function (req, res) {
  var user_id = parseInt(req.params.user_id);
  var book_id = parseInt(req.params.book_id);
  // 현재 유저의 접속 상태를 True 로 설정
  var sql = "UPDATE UserInfo SET now_reading=? WHERE user_id=?";
  db.query(sql, [1, user_id], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      var sql =
        "SELECT total_reading_time FROM BookInfo WHERE user_id=? and book_id=?";
      db.query(sql, [user_id, book_id], function (err, result) {
        if (err) {
          console.log(err);
        } else {
          // 현재 유저 user_id 과 총 독서시간을 응답데이터로 전송
          //res.send("타이머 시작 완료");
          res.send({
            user_id: user_id,
            total_reading_time: result[0].total_reading_time,
          });
        }
      });
    }
  });
});

// 타이머 종료
app.post("/timer/finish/:user_id/:book_id", function (req, res) {
  var user_id = parseInt(req.params.user_id);
  var book_id = parseInt(req.params.book_id);
  var total_reading_time = parseInt(req.body.total_reading_time);
  var current_reading_page = parseInt(req.body.current_reading_page);
  // 현재 유저의 접속 상태를 False 로 설정
  var sql = "UPDATE UserInfo SET now_reading=? WHERE user_id=?";
  db.query(sql, [0, user_id], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      // 현재 유저가 읽고있는 책의 총 독서시간과 현재 읽고있는 페이지 업데이트
      var sql =
        "UPDATE BookInfo SET total_reading_time=?, current_reading_page=? WHERE user_id=? and book_id=?";
      db.query(
        sql,
        [total_reading_time, parseInt(current_reading_page), user_id, book_id],
        function (err, result) {
          // 현재 유저 user_id 과 total_reading_time 응답
          // 타이머 페이지 렌더링하기
          if (err) {
            console.log(err);
          } else {
            res.send("타이머 종료 완료");
          }
        }
      );
    }
  });
});

app.listen(3000, () => {
  console.log("CONNTEECTED!!");
});
