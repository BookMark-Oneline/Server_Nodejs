const pool = require("../../config/database");
const userBelongDao = require("../../dao/club/userBelongDao");
const { errResponse, response } = require("../../config/response");
const baseResponse = require("../../config/baseResponse");


// Provider: Select 비즈니스 로직 처리
// 사용자(userid)가 속한 책모임을 조회함
exports.userBelong = async (user_id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const userBelongResult = await userBelongDao.userBelong(connection, [user_id]);
    connection.release();

    return userBelongResult;
    //return response(baseResponse.SUCCESS);
  };