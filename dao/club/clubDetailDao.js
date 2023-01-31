module.exports.clubDetail = async (connection, [club_id]) =>{
    const clubDetailQuery =`SELECT club_post_id, club_post_title, post_content_text, like_num, comment_num FROM ClubPost WHERE club_id = ?;`;
    const clubDetailRow = await connection.query(clubDetailQuery, [club_id]);
    
    return clubDetailRow;
}


// GET할 내용 
// club_post_id
// club_post_title
// post_content_text
// like_num
// comment_num