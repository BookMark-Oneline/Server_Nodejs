
module.exports.selectBooks = async (connection, user_id) =>{
    const selectBookQuery = `SELECT book_id, user_id, title, img_url, author FROM BookInfo WHERE user_id = ?;`;

    const [shelfRows] = await connection.query(selectBookQuery, user_id);
    return shelfRows;
}