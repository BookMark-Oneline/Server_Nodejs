const pool = require("../../config/database");
const postDao = require("../../dao/club/postDao");
const {
  insertLike,
  deleteLike,
  registerAnnouncement,
  addComment,
  addPost,
} = require("../../dao/club/postDao");
const { errResponse, response } = require("../../config/response");
const baseResponse = require("../../config/baseResponse");

// 좋아요 누르기
module.exports.retrieveInsertLike = async (club_post_id, user_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const insertLikeResult = await insertLike(connection, club_post_id, user_id);
  connection.release();

  return insertLikeResult[0];
};

// 좋아요 취소
module.exports.retrieveDeleteLike = async (club_post_id, user_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const deleteLikeResult = await deleteLike(connection, club_post_id, user_id);
  connection.release();

  return deleteLikeResult[0];
};

// 공지 등록
module.exports.retrieveRegisterAnnouncement = async (
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

// 댓글 작성
module.exports.retrieveAddComment = async (
  user_id,
  club_post_id,
  comment_content_text
) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const addCommentResult = await addComment(
    connection,
    user_id,
    club_post_id,
    comment_content_text
  );
  connection.release();

  return addCommentResult[0];
};

// 게시물 작성

module.exports.retrieveAddPost = async (
  user_id,
  club_id,
  club_post_title,
  post_content_text,
  img_status,
  img_url
) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const addPostResult = await addPost(
    connection,
    user_id,
    club_id,
    club_post_title,
    post_content_text,
    img_status,
    img_url
  );
  connection.release();

  return addPostResult[0];
};
