
module.exports.selectClubSetting = async(connection, club_id) => {
    const selectClubSettingQuery = `SELECT club_name, club_img_url, club_invite_option, max_people_num FROM ClubInfo WHERE club_id=?;`;
    const [clubSettingRows] = await connection.query(selectClubSettingQuery, club_id);
    return clubSettingRows;
};

module.exports.updateClubSettingInfo = async (connection, updateClubSettingInfoParams ) => {
    const updateClubSettingInfoQuery = `UPDATE ClubInfo SET club_name=?, club_img_url=?, club_invite_option=?, max_people_num=? WHERE club_id=?;`
    const [updateClubSettingInfoRow] = await connection.query(
        updateClubSettingInfoQuery,
        updateClubSettingInfoParams
    );
    return updateClubSettingInfoRow;
}

module.exports.insertClubInfo = async(connection, insertClubInfoParams) => {
    const insertClubInfoQuery = `INSERT INTO ClubInfo (club_name, club_img_url, club_invite_option, max_people_num, club_owner_id) VALUES (?,?,?,?,?);`;
    const [insertClubInfoRow] = await connection.query(
        insertClubInfoQuery, 
        insertClubInfoParams
    );

    return insertClubInfoRow;

}

module.exports.selectClub = async(connection, club_id) => {
    const selectClubInfoQuery = `SELECT club_id FROM ClubInfo WHERE club_id =?;`;
    const [selectClubRow] = await connection.query(
        selectClubInfoQuery, club_id
    );
    return selectClubRow;
}

module.exports.selectUser = async(connection, user_id) => {
    const selectClubInfoQuery = `SELECT user_id FROM UserInfo WHERE user_id =?;`;
    const [selectClubRow] = await connection.query(
        selectClubInfoQuery, user_id
    );
    return selectClubRow;
}


module.exports.selectRequestingMembersInfo = async(connection, club_id) => {
    const selectUserInfoQuery = `SELECT DISTINCT ClubMember.user_id,
    UserInfo.introduce_message, 
    UserInfo.user_name, 
    UserInfo.img_url 
    FROM ClubMember 
    JOIN UserInfo 
    ON ClubMember.user_id = UserInfo.user_id 
    WHERE ClubMember.club_id = ? 
    AND ClubMember.is_member = 0;`;
    const [selectUserRow] = await connection.query(
        selectUserInfoQuery, club_id
    );
    return selectUserRow;
}

// 가입요청.
module.exports.insertUserRequest = async(connection, [club_id, user_id]) => {
    const insertUserRequestInfoQuery = `INSERT INTO ClubMember (user_id, club_id, is_member) VALUES (?,?,?);`;
    const [insertUserRequestRow] = await connection.query(insertUserRequestInfoQuery, [user_id, club_id, 0]);
    return insertUserRequestRow;
}

// 요청 승인.
module.exports.updateUserStatusInfo = async(connection, [user_id, club_id]) => {
    const updateUserStatusInfoQuery = `UPDATE ClubMember SET is_member=1 WHERE user_id=? AND club_id=?;`;
    const [updatedUserRow] = await connection.query(
        updateUserStatusInfoQuery, [user_id, club_id]
    );

    return updatedUserRow;
}

//요청 거절.
module.exports.deleteUserStatusInfo = async(connection, [user_id, club_id]) => {
    const deleteUserStatusInfoQuery = `DELETE FROM ClubMember WHERE is_member=0 AND user_id=? AND club_id=?;`;
    const [deletedUserRow] = await connection.query(
        deleteUserStatusInfoQuery, [user_id, club_id]
    );

    return deletedUserRow;
}

// 2 -1
module.exports.userBelong = async (connection, [user_id]) =>{
    const userBelongQuery =`SELECT ClubInfo.club_id, ClubInfo.club_img_url, ClubInfo.club_name, ClubInfo.club_owner_id FROM ClubInfo LEFT JOIN ClubMember ON ClubInfo.club_id = ClubMember.club_id WHERE ClubMember.user_id = ?;`;
    const userBelongRow = await connection.query(userBelongQuery, [user_id]);
    
    return userBelongRow[0];
}


// 2 - 2
// module.exports.clubDetail = async (connection, [club_id]) =>{
//     const clubDetailQuery =`SELECT ClubPost.club_post_id, ClubPost.club_post_title, ClubPost.post_content_text, ClubPost.like_num, ClubPost.comment_num, ClubPost.created_at, ClubInfo.announcement_id FROM ClubPost LEFT JOIN ClubInfo ON ClubPost.club_id = ClubInfo.club_id WHERE ClubPost.club_id = ?;`;
//     const clubDetailRow = await connection.query(clubDetailQuery, [club_id]);
    
//     return clubDetailRow[0];
// }
module.exports.AnnouncementDetail = async (connection, [club_id]) =>{
    const AnnouncementDetailQuery =`SELECT ClubPost.club_id, ClubInfo.announcement_id FROM ClubPost LEFT JOIN ClubInfo ON ClubPost.club_id = ClubInfo.club_id WHERE ClubPost.club_id = ?;`;
    const AnnouncementDetailRow = await connection.query(AnnouncementDetailQuery, [club_id]);
    
    return AnnouncementDetailRow[0];
}
module.exports.PostDetail = async (connection, [club_id]) =>{
    const clubDetailQuery =`SELECT ClubPost.club_post_id, ClubPost.club_post_title, ClubPost.post_content_text, ClubPost.like_num, ClubPost.comment_num, ClubPost.created_at FROM ClubPost LEFT JOIN ClubInfo ON ClubPost.club_id = ClubInfo.club_id WHERE ClubPost.club_id = ?;`;
    const clubDetailRow = await connection.query(clubDetailQuery, [club_id]);
    
    return clubDetailRow[0];
}


// 2 - 5 책 모임의 소속 회원의 이름, 상태메시지, 현재 상태를 조회함
module.exports.clubMember = async (connection, [club_id]) =>{
    const clubSearchQuery =`SELECT UserInfo.user_name, UserInfo.user_id, UserInfo.now_reading, UserInfo.introduce_message, UserInfo.img_url FROM UserInfo LEFT JOIN ClubMember ON UserInfo.user_id = ClubMember.user_id LEFT JOIN ClubInfo ON ClubMember.club_id = ClubInfo.club_id WHERE ClubInfo.club_id = ?;`;
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

module.exports.insertOwnerClubInfo = async(connection, [club_owner_id, club_id]) => {
    const InsertOwnerInClubQuery = `INSERT INTO ClubMember (user_id, club_id, is_member) VALUES(?,?,?);`;
    const onwerResult = await connection.query(InsertOwnerInClubQuery,  [club_owner_id, club_id, 1]);
    return onwerResult
}

module.exports.findMyClub = async(connection) => {
    const clubQuery = `SELECT * FROM ClubInfo WHERE club_id = (SELECT max(club_id) FROM ClubInfo) `;
    const clubResult =  await connection.query(clubQuery);

    return clubResult[0]
}


module.exports.findMyClubCondition = async(connection, [club_id]) => {
    const clubConditionQuery = `SELECT club_invite_option FROM ClubInfo WHERE club_id=?;`;
    const clubCondtionResult =  await connection.query(clubConditionQuery, [club_id]);

    return clubCondtionResult[0]
}

module.exports.insertUserDirectly = async(connection, [club_id,user_id]) => {
    const InsertUserInClubDirectlyQuery = `INSERT INTO ClubMember (club_id, user_id, is_member) VALUES(?,?,?);`;
    const JoinResult = await connection.query(InsertUserInClubDirectlyQuery,  [club_id, user_id, 1]);

    return JoinResult[0]

}