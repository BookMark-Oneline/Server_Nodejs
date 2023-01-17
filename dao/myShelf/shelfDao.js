


module.exports.selectBooks = async (connection, user_id) =>{
    const selectBookQuery =`SELECT BookInfo.book_id, BookInfo.title, BookInfo.author, BookInfo.img_url
    FROM BookInfo
    INNER JOIN BookShelf
    ON BookShelf.book_Id = BookInfo.book_Id
    WHERE BookShelf.user_id = ?;`;
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