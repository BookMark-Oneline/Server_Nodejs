module.exports.selectUserId = async (connection, user_id) => {
  const selectUserInfoQuery = `SELECT user_id FROM UserInfo WHERE user_id = ?`;
  const [userId] = await connection.query(selectUserInfoQuery, user_id);
  return userId;
};
