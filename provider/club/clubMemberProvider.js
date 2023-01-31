const pool = require("../../config/database");
const clubMemberDao = require("../../dao/club/clubMemberDao");
const { errResponse, response } = require("../../config/response");
const baseResponse = require("../../config/baseResponse");
// const { clubMember } = require("../../dao/club/clubMemberDao");

// Provider: Select 비즈니스 로직 처리
// 모임 회원 정보 조회하기   
exports.clubMember = async (club_id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const clubMemberResult = await clubMemberDao.clubMember(connection, [club_id]);
    connection.release();
    
    return clubMemberResult
    //return response(baseResponse.SUCCESS);
  };