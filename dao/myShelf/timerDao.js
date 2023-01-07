// 현재 유저 now_reading 을 1로 UPDATE
module.exports.updateOnline = async (connection, user_id) => {
    const updateOnlineQuery = `UPDATE UserInfo SET now_reading=? WHERE user_id=?;`;
    const updateOnlineRow = await connection.query(updateOnlineQuery, [
      1,
      user_id,
    ]);
    return updateOnlineRow[0];
  };
  
  // 현재 유저 now_reading 을 0으로 UPDATE
  module.exports.updateOffline = async (connection, user_id) => {
    const updateOfflineQuery = `UPDATE UserInfo SET now_reading=? WHERE user_id=?;`;
    const updateOfflineRow = await connection.query(updateOfflineQuery, [
      0,
      user_id,
    ]);
    return updateOfflineRow[0];
  };
  
  // 현재 유저가 선택한 책의 total_reading_time  SELECT
  module.exports.selectTotalReadingTime = async (
    connection,
    user_id,
    book_id
  ) => {
    const selectTotalReadingTimeQuery = `SELECT total_reading_time FROM BookInfo WHERE user_id=? and book_id=?;`;
    const [selectTotalReadingTimeRow] = await connection.query(selectTotalReadingTimeQuery, [user_id, book_id]);
    console.log(selectTotalReadingTimeRow);
    return selectTotalReadingTimeRow;
  };
  


  // 현재 유저가 선택한 책의 총 독서시간과 현재 읽고있는 페이지 업데이트
  module.exports.updateBookInfo = async (connection, updateBookInfoParams ) => {

    const updateBookInfoQuery = `UPDATE BookInfo SET total_reading_time=?, current_reading_page=? WHERE user_id=? and book_id=?;`;
    const updateBookInfoRow = await connection.query(updateBookInfoQuery,updateBookInfoParams);
    return updateBookInfoRow;

  };
