


module.exports.selectBooks = async (connection, user_id) =>{
    const selectBookQuery =`SELECT BookShelf.user_id, UserInfo.total_book, UserInfo.streak, UserInfo.goal, BookInfo.book_id, BookInfo.title, BookInfo.author, BookInfo.img_url
    FROM BookShelf INNER JOIN UserInfo ON BookShelf.user_id = UserInfo.user_id INNER JOIN BookInfo ON BookShelf.book_id =  BookInfo.book_id WHERE BookShelf.user_id = ?;`;
    const [shelfRows] = await connection.query(selectBookQuery, user_id);
    return shelfRows;

}

// 성언 수정 02/09
// module.exports.selectBookDetail = async(connection, book_id) => {
   
//     const selectBookDetailQuery = `SELECT 
//     BookShelf.user_id,
//     BookInfo.book_id,
//     BookInfo.title,
//     BookInfo.author,
//     BookInfo.img_url,
//     BookInfo.publisher,
//     BookInfo.total_reading_time,
//     BookInfo.current_reading_page,
//     BookInfo.total_page,
//     BookRecord.created_at,
//     BookRecord.reading_time
//     FROM BookInfo INNER JOIN BookShelf ON BookInfo.book_id = BookShelf.book_id INNER JOIN BookRecord ON BookInfo.book_id = BookRecord.book_id WHERE BookShelf.book_id = ?;`;

//     const [bookDetailRows] = await connection.query(selectBookDetailQuery, book_id);
//     console.log(selectBookDetailQuery);
//     return bookDetailRows;

   
// }

module.exports.selectBookDetail = async(connection, book_id) => {
   
    const selectBookDetailQuery = `SELECT 
    BookShelf.user_id,
    BookInfo.book_id,
    BookInfo.title,
    BookInfo.author,
    BookInfo.img_url,
    BookInfo.publisher,
    BookInfo.total_reading_time,
    BookInfo.current_reading_page,
    BookInfo.total_page
    FROM BookShelf INNER JOIN BookInfo ON BookInfo.book_id = BookShelf.book_id WHERE BookShelf.book_id = ?;`;

    const [bookDetailRows] = await connection.query(selectBookDetailQuery, book_id);
    console.log(selectBookDetailQuery);
    return bookDetailRows;

   
}
module.exports.selectDataDetail = async(connection, book_id) => {
   
    const selectDataDetailQuery = `SELECT 
    BookRecord.created_at,
    BookRecord.reading_time
    FROM BookRecord INNER JOIN BookInfo ON BookRecord.book_id = BookInfo.book_id WHERE BookInfo.book_id = ?;`;

    const [dataDetailRows] = await connection.query(selectDataDetailQuery, book_id);
    console.log(selectDataDetailQuery);
    return dataDetailRows;

   
}