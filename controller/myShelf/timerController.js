const timerService = require("../../service/myShelf/timerService");
const timerProvider = require('../../provider/myShelf/timerProvider')


module.exports.startTimer = async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const book_id = parseInt(req.params.book_id);
    if (!user_id) {
      res.send("This is not proper id");
      res.redirect("/");
    } else {
      // 현재 유저의 접속 상태를 True 로 설정
      const Online = await timerService.retrieveUserOnline(user_id);
      console.log(Online);
      // 현재 선택된 책의 총 독서시간 응답데이터로 전송
      const totalReadingTime = await timerProvider.retrieveTotalReadingTime(
        user_id,
        book_id
      );
      console.log(totalReadingTime);
      res.send({
        user_id: user_id,
        total_reading_time: totalReadingTime.total_reading_time,
      });
    }
  } catch (err) {
    console.log("Error", err);
  }
};
  


  // 타이머 종료
  module.exports.finishTimer = async (req, res) => {
    try {
      const { user_id, book_id } = req.params;
      const { total_reading_time, current_reading_page } = req.body
      
      if (!user_id) {
        res.send("This is not proper id");
        res.redirect("/");
      } else {
        // 현재 유저의 접속 상태를 False 로 설정
        const Offline = await timerService.retrieveUserOffline(user_id);
        // 현재 유저가 선택한 책의 총 독서시간과 현재 읽고 있는 페이지 업데이트
        const BookInfo = await timerService.editBookInfo(
          total_reading_time, 
          current_reading_page, 
          user_id, book_id);
          console.log(BookInfo);
        return res.send(BookInfo)
      }
    } catch (err) {
      console.log("Error", err);
    } 
};
