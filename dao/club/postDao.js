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
  const deleteLikeQuery = `DELETE FROM PostLike WHERE club_post_id = ? AND user_id = ?`;
  const deleteLikeRow = await connection.query(deleteLikeQuery, [
    club_post_id,
    user_id,
  ]);
  return deleteLikeRow[0];
};

// 특정 게시글을 공지로 등록하기
// club_post_id 게시물을 이 게시물의 club_id 모임의 announcement_id 로 변경
// 공지로 등록하려는 유저가 모임의 생성자인지 한번 더 확인
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
