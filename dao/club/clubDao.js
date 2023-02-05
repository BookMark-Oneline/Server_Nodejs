// 2 -1
module.exports.userBelong = async (connection, [user_id]) =>{
    const userBelongQuery =`SELECT ClubInfo.club_id, ClubInfo.club_img_url, ClubInfo.club_name, ClubInfo.club_owner_id FROM ClubInfo LEFT JOIN ClubMember ON ClubInfo.club_id = ClubMember.club_id WHERE ClubMember.user_id = ?;`;
    const userBelongRow = await connection.query(userBelongQuery, [user_id]);
    
    return userBelongRow[0];
}


// 2 - 2
module.exports.clubDetail = async (connection, [club_id]) =>{
    const clubDetailQuery =`SELECT ClubPost.club_post_id, ClubPost.club_post_title, ClubPost.post_content_text, ClubPost.like_num, ClubPost.comment_num, ClubInfo.announcement_id FROM ClubPost LEFT JOIN ClubInfo ON ClubPost.club_id = ClubInfo.club_id WHERE ClubPost.club_id = ?;`;
    const clubDetailRow = await connection.query(clubDetailQuery, [club_id]);
    
    return clubDetailRow[0];
}

// 2 - 5 책 모임의 소속 회원의 이름, 상태메시지, 현재 상태를 조회함
module.exports.clubMember = async (connection, [club_id]) =>{
    const clubSearchQuery =`SELECT UserInfo.user_id, UserInfo.now_reading, UserInfo.profile_message FROM UserInfo LEFT JOIN ClubMember ON UserInfo.user_id = ClubMember.user_id LEFT JOIN ClubInfo ON ClubMember.club_id = ClubInfo.club_id WHERE ClubInfo.club_id = ?;`;
    const clubSearchRow = await connection.query(clubSearchQuery, [club_id]);
    
    return clubSearchRow[0];
}

// // 2 -9
// // 가입 요청 보내기 
// module.exports.clubRequest = async ( connection, user_id, club_id) => {
//     try {
//         const clubRequestQuery =
//         "INSERT INTO ClubMember (user_id, club_id, is_member) VALUES (?, ?, 1);";
//         const clubRequestRow = await connection.query(clubRequestQuery, [
//         user_id,
//         club_id,
//         ]);
        
//         return clubRequestRow;
//         //return clubRequestRow[0];
//     } catch (err) {
//         console.log(err);
//         return res.status(404).send(err._message);
//     }
//     };


// 2 - 10
module.exports.clubSearch = async (connection, [club_id]) =>{
    const clubSearchQuery =`SELECT ClubInfo.club_id, ClubInfo.club_name, ClubInfo.club_img_url, ClubInfo.club_invite_option, UserInfo.user_id, UserInfo.user_name, UserInfo.img_url FROM ClubInfo LEFT JOIN UserInfo ON ClubInfo.club_owner_id = UserInfo.user_id WHERE ClubInfo.club_id = ?;`;
    const clubSearchRow = await connection.query(clubSearchQuery, [club_id]);
    
    return clubSearchRow[0];
}
