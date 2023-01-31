module.exports.userBelong = async (connection, [user_id]) =>{
    const userBelongQuery =`SELECT ClubInfo.club_id, ClubInfo.club_img_url, ClubInfo.club_name, ClubInfo.club_owner_id FROM ClubInfo LEFT JOIN ClubMember ON ClubInfo.club_id = ClubMember.club_id WHERE ClubMember.user_id = ?;`;
    const userBelongRow = await connection.query(userBelongQuery, [user_id]);
    
    return userBelongRow;
}


// GET할 내용 
// club_id
// club_img_url
// club_name
// club_owner_id