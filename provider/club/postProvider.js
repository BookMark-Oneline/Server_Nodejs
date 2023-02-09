const pool = require("../../config/database");
const postDao = require("../../dao/club/postDao");

// 게시물 상세보기
module.exports.retrieveViewPost = async (club_post_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const viewPostResult = await postDao.viewPost(connection, club_post_id);
  connection.release();

  return viewPostResult[0];
};

// 게시물의 댓글 보기
module.exports.retrieveViewPostComment = async (club_post_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const viewPostCommentResult = await postDao.viewPostComment(
    connection,
    club_post_id
  );
  connection.release();

  return viewPostCommentResult;
};
