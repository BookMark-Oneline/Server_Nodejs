const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// DB 연결
// var db = require('./lib/db')

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

app.listen(3000, () => {
  console.log("CONNTEECTED!!");
});
