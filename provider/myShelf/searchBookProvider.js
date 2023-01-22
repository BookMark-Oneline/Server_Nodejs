const pool = require("../../config/database");
const { selectUserId } = require("../../dao/myShelf/userDao");

exports.retrieveUserId = async (user_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const userIdResult = await selectUserId(connection, user_id);
  connection.release();
  return userIdResult[0];
};

