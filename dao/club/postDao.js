
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
    const selectUserInfoQuery = `SELECT 
    ClubMember.user_id, 
    UserInfo.introduce_message, 
    UserInfo.user_name, 
    UserInfo.img_url 
    FROM ClubMember
    JOIN UserInfo 
    ON ClubMember.user_id = UserInfo.user_id 
    WHERE club_id=? and is_member=0;`;
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