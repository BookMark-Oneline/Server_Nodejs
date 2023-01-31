const pool = require("../../config/database");
const clubRequestDao = require("../../dao/club/clubRequestDao");
const { errResponse, response } = require("../../config/response");
const baseResponse = require("../../config/baseResponse");


// Service: Create, Update, Delete 비즈니스 로직 처리
// 모임 가입 요청 전송하기 
exports.clubRequest = async (user_id, club_id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const clubRequestResult = await clubRequestDao.clubRequest(connection, [user_id, club_id]);
    connection.release();
  
    return response(baseResponse.SUCCESS);
  };
