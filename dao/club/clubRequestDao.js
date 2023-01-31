// 책 모임 신청하기 
// module.exports.clubRequest = async (connection, [user_id, club_id]) => {
//     const clubRequestQuery = `INSERT IGNORE INTO PostLike (club_post_id, user_id) VALUES(?, ?);`;
//     const clubRequestRow = await connection.query(clubRequestQuery, [
//       user_id,
//       club_id,
//     ]);
//     return clubRequestRow[0];
//   };


module.exports.clubRequest = async ( connection, [user_id, club_id]) => {
try {
    const clubRequestQuery =
    "INSERT INTO ClubMember (user_id, club_id, is_member) VALUES (?, ?, 1);";
    const clubRequestRow = await connection.query(clubRequestQuery, [
    user_id,
    club_id,
    ]);
    
    return clubRequestRow;
    // return clubRequestRow[0];
} catch (err) {
    console.log(err);
    return res.status(404).send(err._message);
}
};