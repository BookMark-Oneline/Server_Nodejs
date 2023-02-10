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
  const selectTotalReadingTimeQuery = `SELECT total_reading_time FROM BookInfo WHERE book_id=?;`;
  const [selectTotalReadingTimeRow] = await connection.query(
    selectTotalReadingTimeQuery,
    book_id
  );
  return selectTotalReadingTimeRow;
};

// 현재 유저가 선택한 책의 총 독서시간과 현재 읽고있는 페이지 업데이트
module.exports.updateBookInfo = async (connection, updateBookInfoParams) => {
  const updateBookInfoQuery = `UPDATE BookInfo SET total_reading_time= total_reading_time + ?, current_reading_page=? WHERE book_id=?;`;
  const [updateBookInfoRow] = await connection.query(
    updateBookInfoQuery,
    updateBookInfoParams
  );
  // console.log(updateBookInfoParams);
  // console.log(updateBookInfoRow);
  return updateBookInfoRow;
};

// 현재 날짜 데이터가 BookRecord의 created_at에 있는지 조회하는 모듈
module.exports.isTodayRead = async (connection, dateStr) => {
  const isTodayReadQuery = `SELECT * FROM BookRecord WHERE DATE(created_at)=? ;`;
  const [isTodayReadRow] = await connection.query(
    isTodayReadQuery,
    dateStr
    // updateBookInfoParams
  );
  
  return isTodayReadRow;
};
// BookRecord에 새로운 데이터를 삽입하는 모듈
module.exports.insertBookRecord = async (connection, user_id, book_id, created_at, total_reading_time) => {
  const insertBookRecordQuery = `INSERT INTO BookRecord (book_id, user_id, created_at, reading_time ) VALUES (?, ?, ?, ?);`;
  const [insertBookRecordRow] = await connection.query(
    insertBookRecordQuery,
    [
    book_id,
    user_id,  
    created_at, 
    total_reading_time
    ]
    // updateBookInfoParams
  );
  
  return insertBookRecordRow;
};
// BookRecord를 업데이트하는 모듈
module.exports.updateBookRecord = async (connection, user_id, book_id, dateStr, total_reading_time ) => {
  const updateBookRecordQuery = `UPDATE BookRecord SET reading_time = reading_time + ? WHERE user_id =? AND book_id = ? AND created_at = ? ;`;
  const [updateBookRecordRow] = await connection.query(
    updateBookRecordQuery,
    [
    total_reading_time,
    user_id,
    book_id, 
    dateStr, 
    ]
    // updateBookInfoParams
  );
 
  return updateBookRecordRow;
};