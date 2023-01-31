module.exports.clubSearch = async (connection, [club_id]) =>{
    const clubSearchQuery =`SELECT club_id, club_img_url, club_invite_option FROM ClubInfo WHERE club_id = ?;`;
    const clubSearchRow = await connection.query(clubSearchQuery, [club_id]);
    
    return clubSearchRow;
}