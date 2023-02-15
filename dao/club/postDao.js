// 좋아요 누르기
// like_status 가 0인 경우 user_id 랑 club_post_id 를 PostLike 에 INSERT
module.exports.insertLike = async (connection, club_post_id, user_id) => {
  const insertLikeQuery = `INSERT IGNORE INTO PostLike (club_post_id, user_id) VALUES(?, ?);`;
  const insertLikeRow = await connection.query(insertLikeQuery, [
    club_post_id,
    user_id,
  ]);
  return insertLikeRow[0];
};

// 좋아요 개수 +1
module.exports.addLikeCount = async (connection, club_post_id) => {
  const addLikeCountQuery = `UPDATE ClubPost SET like_num = like_num + 1 WHERE club_post_id = ?`;
  const addLikeCountRow = await connection.query(
    addLikeCountQuery,
    club_post_id
  );
  return addLikeCountRow[0];
};

// 좋아요 취소하기
// like_status 가 1인 경우 user_id 랑 club_post_id 로 조회해서 그 데이터 PostLike 에서 삭제
module.exports.deleteLike = async (connection, club_post_id, user_id) => {
  const deleteLikeQuery = `DELETE FROM PostLike WHERE club_post_id = ? AND user_id = ?`;
  const deleteLikeRow = await connection.query(deleteLikeQuery, [
    club_post_id,
    user_id,
  ]);
  return deleteLikeRow[0];
};

// 좋아요 개수 -1
module.exports.subLikeCount = async (connection, club_post_id) => {
  const subLikeCountQuery = `UPDATE ClubPost SET like_num = like_num - 1 WHERE club_post_id = ?`;
  const subLikeCountRow = await connection.query(
    subLikeCountQuery,
    club_post_id
  );
  return subLikeCountRow[0];
};

// 특정 게시글을 공지로 등록하기
// club_post_id 게시물을 이 게시물의 club_id 모임의 announcement_id 로 변경
module.exports.registerAnnouncement = async (
  connection,
  club_id,
  user_id,
  club_post_id
) => {
  const registerAnnouncementQuery = `UPDATE ClubInfo SET announcement_id = ? WHERE club_id = ?;`;
  const registerAnnouncementRow = await connection.query(
    registerAnnouncementQuery,
    [club_post_id, club_id]
  );
  return registerAnnouncementRow[0];
};

// 댓글 작성
module.exports.addComment = async (
  connection,
  user_id,
  club_post_id,
  comment_content_text,
  created_at
) => {
  const addCommentQuery = `INSERT INTO ClubComment (club_post_id, comment_content_text, writer_id, created_at) VALUES(?, ?, ?, ?);`;

  const addCommentRow = await connection.query(addCommentQuery, [
    club_post_id,
    comment_content_text,
    user_id,
    created_at,
  ]);
  return addCommentRow[0];
};

// 댓글 개수 +1
module.exports.addCommentCount = async (connection, club_post_id) => {
  const addCommentCountQuery = `UPDATE ClubPost SET comment_num = comment_num + 1 WHERE club_post_id = ?;`;
  const addCommentCountRow = await connection.query(
    addCommentCountQuery,
    club_post_id
  );
  return addCommentCountRow[0];
};

// 게시물 작성(사진 포함O)
module.exports.addPostSinglePhoto = async (
  connection,
  user_id,
  club_id,
  club_post_title,
  post_content_text,
  img_status,
  post_img_url,
  created_at
) => {
  const addPostQuery = `INSERT INTO ClubPost (club_id, club_post_title, writer_id, post_content_text, img_status, like_num, comment_num, post_img_url, created_at) VALUES (?,?,?,?,?,?,?,?,?);`;
  const addPostRow = await connection.query(addPostQuery, [
    club_id,
    club_post_title,
    user_id,
    post_content_text,
    img_status,
    0,
    0,
    post_img_url,
    created_at,
  ]);
  return addPostRow[0];
};

// 게시물 작성(사진 포함X)
module.exports.addPost = async (
  connection,
  user_id,
  club_id,
  club_post_title,
  post_content_text,
  img_status,
  created_at
) => {
  const addPostQuery = `INSERT INTO ClubPost (club_id, club_post_title, writer_id, post_content_text, img_status, like_num, comment_num,  created_at) VALUES (?,?,?,?,?,?,?,?);`;
  const addPostRow = await connection.query(addPostQuery, [
    club_id,
    club_post_title,
    user_id,
    post_content_text,
    img_status,
    0,
    0,
    created_at,
  ]);
  return addPostRow[0];
};

// 게시물 상세보기
module.exports.viewPost = async (connection, club_post_id) => {
  const viewPostQuery = `select P.club_post_id, P.club_post_title, P.img_status, P.post_img_url, P.post_content_text, U.user_id, U.user_name, U.img_url, P.like_num, P.comment_num from ClubPost as P JOIN UserInfo as U on P.writer_id = U.user_id where P.club_post_id = ?;`;
  const viewPostRow = await connection.query(viewPostQuery, club_post_id);

  return viewPostRow[0];
};

// 게시물의 댓글보기
module.exports.viewPostComment = async (connection, club_post_id) => {
  const viewPostCommentQuery = `select C.club_comment_id, C.writer_id, U.user_name, U.img_url ,C.comment_content_text  from ClubComment as C JOIN ClubPost as P on P.club_post_id = C.club_post_id JOIN UserInfo as U on U.user_id = C.writer_id where P.club_post_id = ?;`;
  const viewPostCommentRow = await connection.query(
    viewPostCommentQuery,
    club_post_id
  );

  return viewPostCommentRow[0];
};
