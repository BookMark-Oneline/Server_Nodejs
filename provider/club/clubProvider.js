const pool = require("../../config/database");
const {
  selectClubSetting,
  selectClub,
  selectUser,
  selectRequestingMembersInfo,
} = require("../../dao/club/clubDao");

const {
  AnnouncementDetail,
  PostDetail,
  clubMember,
  clubSearch,
  userBelong,
  findMyClub
} = require("../../dao/club/clubDao");

const { errResponse, response } = require("../../config/response");
const baseResponse = require("../../config/baseResponse");

module.exports.retrieveClubSetting = async (club_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const clubSettingResult = await selectClubSetting(connection, club_id);
  connection.release();
  return clubSettingResult;
};

module.exports.findUser = async (user_id) => {
  const connection = await pool.getConnection(async (coon) => coon);
  const userResult = await selectUser(connection, user_id);
  connection.release();
  return userResult;
};

module.exports.findClub = async (club_id) => {
  const connection = await pool.getConnection(async (coon) => coon);
  const clubResult = await selectClub(connection, club_id);
  connection.release();
  return clubResult;
};

module.exports.retrieveRequestingMembers = async (club_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const userInfoResult = await selectRequestingMembersInfo(connection, club_id);
  connection.release();
  return userInfoResult;
};

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
// exports.clubDetail = async (club_id) => {
//   const connection = await pool.getConnection(async (conn) => conn);
//   const clubDetailResult = await clubDetail(connection, [club_id]);
//   connection.release();

//   return clubDetailResult;
//   //return response(baseResponse.SUCCESS);
// };
exports.retrieveAnnouncementResponse = async (club_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const AnnouncementResult = await AnnouncementDetail(connection, [club_id]);
  connection.release();

  return AnnouncementResult[0]; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //return response(baseResponse.SUCCESS);
};
exports.retrievePostResponse = async (club_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const retrievePostResult = await PostDetail(connection, [club_id]);
  connection.release();

  return retrievePostResult;
  //return response(baseResponse.SUCCESS);
};


// 2-5
// Provider: Select 비즈니스 로직 처리
// 모임 회원 정보 조회하기
exports.clubMember = async (club_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const clubMemberResult = await clubMember(connection, [club_id]);
  connection.release();

  return clubMemberResult;
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


module.exports.findClubId = async() => {
  const connection = await pool.getConnection(async (conn) => conn);
  const club = await findMyClub(connection);
  connection.release();
  
  return club;

}