const pool = require("../../config/database");
const timerDao = require("../../dao/myShelf/timerDao");
const { updateOnline } = require("../../dao/myShelf/timerDao");
const { errResponse, response } = require("../../config/response");
const baseResponse = require("../../config/baseResponse");

//유저 접속 여부 업데이트 ( 0 -> 1)
exports.retrieveUserOnline = async (user_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const updateOnlineResult = await updateOnline(connection, user_id);
  connection.release();

  return updateOnlineResult[0];
};

// 유저 접속 여부 업데이트 ( 1 -> 0 )
exports.retrieveUserOffline = async (user_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const updateOfflineResult = await timerDao.updateOffline(connection, user_id);
  connection.release();

  return updateOfflineResult[0];
};

// total_reading_time, current_reading_page 데이터 업데이트
exports.editBookInfo = async (
  total_reading_time,
  current_reading_page,
  book_id
) => {
  const updateBookInfoParams = [
    parseInt(total_reading_time),
    parseInt(current_reading_page),
    parseInt(book_id),
  ];
  const connection = await pool.getConnection(async (conn) => conn);
  const updateBookInfoResult = timerDao.updateBookInfo(
    connection,
    updateBookInfoParams
  );
  connection.release();

  return response(baseResponse.SUCCESS);
};

// BookRecord에 새로운 데이터를 삽입하는 모듈
exports.insertBookRecord = async (

  user_id,
  book_id,
  created_at,
  total_reading_time

) => {
  // const updateBookInfoParams = [
  //   parseInt(total_reading_time),
  //   parseInt(current_reading_page),
  //   parseInt(book_id),
  // ];
  const connection = await pool.getConnection(async (conn) => conn);
  const insertBookRecordResult = timerDao.insertBookRecord(
    connection,


    user_id,
    book_id,
    created_at,
    total_reading_time
  );
  connection.release();


  return insertBookRecordResult[0];
};

// BookRecord를 업데이트하는 모듈
exports.updateBookRecord = async (

  user_id,
  book_id,
  dateStr,
  total_reading_time

) => {
  // const updateBookInfoParams = [
  //   parseInt(total_reading_time),
  //   parseInt(current_reading_page),
  //   parseInt(book_id),
  // ];
  const connection = await pool.getConnection(async (conn) => conn);
  const updateBookRecordResult = timerDao.updateBookRecord(
    connection,

    user_id,
    book_id,
    dateStr,
    total_reading_time
  );
  connection.release();

  return updateBookRecordResult[0];
};

// 유저의 streak(연속 목표 달성 일수) UPDATE
exports.editStreak = async (user_id, streak) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const updateStreakResult = timerDao.updateStreak(connection, user_id, streak);
  connection.release();

  return updateStreakResult[0];
};

// 유저의 last_cal(마지막으로 목표를 달성한 날짜) UPDATE
exports.editLastCal = async (user_id, last_cal) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const updateLastCalResult = timerDao.updateLastCal(
    connection,
    user_id,
    last_cal
  );
  connection.release();

  return updateLastCalResult[0];
};

