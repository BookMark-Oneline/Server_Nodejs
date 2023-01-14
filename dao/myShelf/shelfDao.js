


module.exports.selectBooks = async (connection, user_id) =>{
    const selectBookQuery = `SELECT book_id FROM BookShelf WHERE user_id = ?;`;
    const [shelfRows] = await connection.query(selectBookQuery, user_id);
    return shelfRows;

}

module.exports.selectBookDetail = async(connection, book_id) => {
   
    const selectBookDetailQuery = `SELECT 
    user_id,
    title,
    author,
    img_url,
    publisher,
    ave_reading_time,
    ave_reading_page
    FROM BookInfo INNER JOIN BookShelf ON BookInfo.book_id = BookShelf.book_id WHERE BookShelf.book_id = ?;`;

    const [bookDetailRows] = await connection.query(selectBookDetailQuery, book_id);
    console.log(bookDetailRows);
    return bookDetailRows;

   
}



