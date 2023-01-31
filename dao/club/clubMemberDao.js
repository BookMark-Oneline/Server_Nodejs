// 2-5 책 모임의 소속 회원의 이름, 상태메시지, 현재 상태를 조회함
module.exports.clubMember = async (connection, [club_id]) =>{
    const clubSearchQuery =`SELECT * FROM UserInfo LEFT JOIN ClubMember ON UserInfo.user_id = ClubInfo.user_id LEFT JOIN ClubInfo ON ClubMember.club_id = ClubInfo.club_id WHERE ClubInfo.club_id = ?;`;
    const clubSearchRow = await connection.query(clubSearchQuery, [club_id]);
    
    return clubSearchRow;
}