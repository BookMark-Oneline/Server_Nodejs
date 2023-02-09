
const { selectBooks , selectBookDetail, selectDataDetail} = require('../../dao/myShelf/shelfDao');
const pool = require('../../config/database')

exports.retrieveBookList = async(user_id) => {
    const connection = await pool.getConnection(async conn => conn);
    const bookListResult = await selectBooks(connection, user_id);
    connection.release();
    return bookListResult; 


exports.retrieveBookList = async (user_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const bookListResult = await selectBooks(connection, user_id);
  connection.release();
  return bookListResult;
};

exports.retrieveBookDetail = async (book_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const bookDetailResult = await selectBookDetail(connection, book_id);
  connection.release();

  return bookDetailResult;
};


// exports.retrieveBookDetail = async(book_id) => {
//     const connection = await pool.getConnection(async conn => conn);
//     const bookDetailResult = await selectBookDetail(connection, book_id);
//     connection.release();
    
//     return bookDetailResult;
   
// }
exports.retrieveBookDetail = async(book_id) => {
    const connection = await pool.getConnection(async conn => conn);
    const bookDetailResult = await selectBookDetail(connection, book_id);
    connection.release();
    
    return bookDetailResult[0];
   
}
exports.retrieveDataDetail = async(book_id) => {
    const connection = await pool.getConnection(async conn => conn);
    const dataDetailResult = await selectDataDetail(connection, book_id);
    connection.release();
    
    return dataDetailResult;
   
}

