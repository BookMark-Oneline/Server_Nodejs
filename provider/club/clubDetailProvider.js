const pool = require("../../config/database");
const clubDetailDao = require("../../dao/club/clubDetailDao");
const { errResponse, response } = require("../../config/response");
const baseResponse = require("../../config/baseResponse");


// Provider: Select 비즈니스 로직 처리
// 책 모임의 이름, 공지, 게시글 목록을 조회함
exports.clubDetail = async (club_id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const clubDetailResult = await clubDetailDao.clubDetail(connection, [club_id]);
    connection.release();

    return clubDetailResult;
    //return response(baseResponse.SUCCESS);
  };