const pool = require("../../config/database");

const { clubDetail, clubMember, clubSearch, userBelong } = require('../../dao/club/clubDao');


const { errResponse, response } = require("../../config/response");
const baseResponse = require("../../config/baseResponse");

// 2-1
// Provider: Select 비즈니스 로직 처리
// 사용자(userid)가 속한 책모임을 조회함
exports.userBelong = async (user_id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const userBelongResult = await userBelong(connection, [user_id]);
    connection.release();

    return userBelongResult;
    //return response(baseResponse.SUCCESS);
  };

// 2 - 2
// Provider: Select 비즈니스 로직 처리
// 책 모임의 이름, 공지, 게시글 목록을 조회함
exports.clubDetail = async (club_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const clubDetailResult = await clubDetail(connection, [club_id]);
  connection.release();

  return clubDetailResult;
  //return response(baseResponse.SUCCESS);
};

// 2-5
// Provider: Select 비즈니스 로직 처리
// 모임 회원 정보 조회하기   
exports.clubMember = async (club_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const clubMemberResult = await clubMember(connection, [club_id]);
  connection.release();
  
  return clubMemberResult
  //return response(baseResponse.SUCCESS);
};

// 2 - 10
// 모임 조회 요청 전송하기  
exports.clubSearch = async (club_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const clubSearchResult = await clubSearch(connection, [club_id]);
  connection.release();

  return clubSearchResult;
};