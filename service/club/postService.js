const pool = require("../../config/database");
const { clubRequest } = require("../../dao/club/postDao");
const { errResponse, response } = require("../../config/response");
const baseResponse = require("../../config/baseResponse");


// Service: Create, Update, Delete 비즈니스 로직 처리
// 모임 가입 요청 전송하기 
// exports.clubRequest = async (user_id, club_id) => {
//     const connection = await pool.getConnection(async (conn) => conn);
//     const clubRequestResult = await clubRequest(connection, [user_id, club_id]);
//     connection.release();

//     return clubRequestResult;
//     //return response(baseResponse.SUCCESS);
//   };

exports.clubRequest = async (user_id, club_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const clubRequestResult = await clubRequest(connection, user_id, club_id);
  connection.release();

  return clubRequestResult[0];
  //return response(baseResponse.SUCCESS);
};