const pool = require("../../config/database");
const postDao = require("../../dao/club/postDao");
const {
  insertLike,
  deleteLike,
  registerAnnouncement,
} = require("../../dao/club/postDao");
const { errResponse, response } = require("../../config/response");
const baseResponse = require("../../config/baseResponse");

// 좋아요 누르기
exports.retrieveInsertLike = async (club_post_id, user_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const insertLikeResult = await insertLike(connection, club_post_id, user_id);
  connection.release();

  return insertLikeResult[0];
};

// 좋아요 취소
exports.retrieveDeleteLike = async (club_post_id, user_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const deleteLikeResult = await deleteLike(connection, club_post_id, user_id);
  connection.release();

  return deleteLikeResult[0];
};

// 공지 등록
exports.retrieveRegisterAnnouncement = async (
  club_id,
  user_id,
  club_post_id
) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const registerAnnouncementResult = await registerAnnouncement(
    connection,
    club_id,
    user_id,
    club_post_id
  );
  connection.release();

  return registerAnnouncementResult[0];
};
