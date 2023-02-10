const pool = require("../../config/database");
const timerDao = require("../../dao/myShelf/timerDao");

exports.retrieveTotalReadingTime = async (user_id, book_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectTotalReadingTimeResult = await timerDao.selectTotalReadingTime(
    connection,
    user_id,
    book_id
  );
  connection.release();

  return selectTotalReadingTimeResult[0];
};

// 현재 날짜 데이터(datestr)가 BookRecord의 created_at에 있는지
exports.isTodayRead = async (dateStr) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const isTodayReadResult = await timerDao.isTodayRead(connection, dateStr);
  connection.release();
  //return response(baseResponse.SUCCESS);
  return isTodayReadResult[0];
};

// 오늘 날짜의 reading_time SELECT
exports.retrieveReadingTime = async (user_id, book_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectReadingTimeResult = await timerDao.selectReadingTime(
    connection,
    user_id,
    book_id
  );
  connection.release();

  return selectReadingTimeResult[0];
};

// 유저의 goal, last_cal, streak SELECT
exports.retrieveUserGoalData = async (user_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const userGoalDataResult = await timerDao.selectUserGoalData(
    connection,
    user_id
  );

  return userGoalDataResult[0];
};
