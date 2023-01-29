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

// 좋아요 취소하기
// like_status 가 1인 경우 user_id 랑 club_post_id 로 조회해서 그 데이터 PostLike 에서 삭제
module.exports.deleteLike = async (connection, club_post_id, user_id) => {
  const deleteLikequery = `DELETE FROM PostLike WHERE club_post_id = ? AND user_id = ?`;
  const deleteLikeRow = await connection.query(deleteLikequery, [
    club_post_id,
    user_id,
  ]);
  return deleteLikeRow[0];
};
