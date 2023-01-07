const pool = require('../../config/database');
const timerDao = require("../../dao/myShelf/timerDao");


//유저 접속 여부 업데이트 ( 0 -> 1)
exports.retrieveUserOnline = async (user_id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const updateOnlineResult = await timerDao.updateOnline(connection, user_id);
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
    user_id,
    book_id
  ) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const updateBookInfoResult = timerDao.updateBookInfo(
      connection,
      total_reading_time,
      parseInt(current_reading_page),
      user_id,
      book_id
    );
    connection.release();
  
    return updateBookInfoResult[0];
  };