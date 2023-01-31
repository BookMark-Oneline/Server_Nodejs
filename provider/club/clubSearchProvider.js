const pool = require("../../config/database");
const clubSearchDao = require("../../dao/club/clubSearchDao");
const { errResponse, response } = require("../../config/response");
const baseResponse = require("../../config/baseResponse");


// Provider: Select 비즈니스 로직 처리
// 모임 조회 요청 전송하기  
exports.clubSearch = async (club_id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const clubSearchResult = await clubSearchDao.clubSearch(connection, [club_id]);
    connection.release();

    return clubSearchResult;
    //return response(baseResponse.SUCCESS);
  };