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
