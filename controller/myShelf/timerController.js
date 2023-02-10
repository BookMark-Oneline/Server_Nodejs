const timerService = require("../../service/myShelf/timerService");
const timerProvider = require("../../provider/myShelf/timerProvider");
const { isTodayRead } = require("../../dao/myShelf/timerDao");
const { SUCCESS } = require("../../config/baseResponse");

module.exports.startTimer = async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const book_id = parseInt(req.params.book_id);
    if (!user_id) {
      res.send("This is not proper id");
      res.redirect("/");
    } else {
      // 현재 유저의 접속 상태를 True 로 설정
      // 최초 유저의 접속 상태는 회원 가입 시  0으로 설정. 그래야 독서중일때 1 로 바뀜.
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
    const { total_reading_time, current_reading_page } = req.body;

    // 현재 날짜 데이터
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const dateStr = year + "-" + month + "-" + day;
    // 현재 시간 데이터
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    const timeStr = hours + ":" + minutes + ":" + seconds;

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
        book_id
      );

      // 현재 날짜 데이터가 BookRecord의 created_at에 있는지 확인
      const isTodayRead = await timerProvider.isTodayRead(dateStr);
      if (isTodayRead) {
        // 오늘 읽음 -> 기존 BookRecord 테이블 업데이트 해주기(UPDATE, SET)
        const updateBookRecord = await timerService.updateBookRecord(
          user_id,
          book_id,
          dateStr,
          total_reading_time
        );
        // 목표 달성했는지 체크
        const userGoalData = await timerProvider.retrieveUserGoalData(user_id);

        // 날짜 포맷
        function dateFormat(date) {
          let dateFormat2 =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1 < 9
              ? "0" + (date.getMonth() + 1)
              : date.getMonth() + 1) +
            "-" +
            (date.getDate() < 9 ? "0" + date.getDate() : date.getDate());
          return dateFormat2;
        }
        var today = new Date();
        var yesterday = dateFormat(
          new Date(today.setDate(today.getDate() - 1))
        );

        let last_cal = dateFormat(new Date(userGoalData.last_cal));
        let streak = userGoalData.streak;
        // console.log(dateStr);
        // console.log(yesterday);
        if (last_cal !== dateStr) {
          const reading_time = await timerProvider.retrieveReadingTime(
            user_id,
            book_id
          );

          if (reading_time.reading_time >= userGoalData.goal) {
            console.log("reading_time 이 goal 달성");

            if (last_cal == yesterday) {
              // console.log(
              //   "last_cal이 어제 날짜와 같음. 오늘 최초 목표 달성. 기존 streak에 1추가"
              // );

              const updateStreak = await timerService.editStreak(
                user_id,
                streak
              );
            } else {
              pass;
              // console.log(
              //   "last_cal이 어제 날짜랑 다름. 오늘부터 연속시작 streak 1로"
              // );

              const updateStreak = await timerService.editStreak(user_id, 0);
            }

            const updateLastCal = await timerService.editLastCal(
              user_id,
              dateStr
            );
          } else {
            // console.log("오늘 목표 달성 실패!");
            const updateStreak = await timerService.editStreak(user_id, -1);
          }
        } else {
          // console.log("오늘 이미 목표 달성 성공");
        }
        res.send(SUCCESS);
      } else {
        // 오늘 읽지 않음(undefined)  -> BookRecord 테이블에 새로운 데이터를 삽입(INSERT) + 목표 달성했는지 체크
        const insertBookRecord = await timerService.insertBookRecord(
          user_id,
          book_id,
          dateStr,
          total_reading_time
        );
        // 목표 달성했는지 체크

        res.send(SUCCESS);
      }
      console.log(BookInfo);
      //return res.send(BookInfo);
    }
  } catch (err) {
    console.log("Error", err);
  }
};
