
module.exports.selectBooks = async (connection, user_id) => {
  const selectBookQuery = `SELECT BookInfo.book_id, BookInfo.title, BookInfo.author, BookInfo.img_url
    FROM BookInfo
    INNER JOIN BookShelf
    ON BookShelf.book_Id = BookInfo.book_Id
    WHERE BookShelf.user_id = ?;`;
  const [shelfRows] = await connection.query(selectBookQuery, user_id);
  return shelfRows;
};

module.exports.selectBookDetail = async (connection, book_id) => {
  const selectBookDetailQuery = `SELECT 
    user_id,
    title,
    author,
    img_url,
    publisher,
    ave_reading_time,
    ave_reading_page
    FROM BookInfo INNER JOIN BookShelf ON BookInfo.book_id = BookShelf.book_id WHERE BookShelf.book_id = ?;`;

  const [bookDetailRows] = await connection.query(
    selectBookDetailQuery,
    book_id
  );
  console.log(bookDetailRows);
  return bookDetailRows;
};

module.exports.selectUser = async (connection, user_id) => {
  const selectUserQuery = `SELECT user_id, img_url, total_book, streak, goal FROM UserInfo WHERE UserInfo.user_id = ?`;
  const [userDataRows] = await connection.query(selectUserQuery, user_id);
  return userDataRows;
};


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

