const pool = require("../../config/database");
const bookDao = require("../../dao/myShelf/bookDao");
const { errResponse, response } = require("../../config/response");
const baseResponse = require("../../config/baseResponse");

// Service: Create, Update, Delete 비즈니스 로직 처리
exports.registerBook = async (
  user_id,
  title,
  img_url,
  author,
  publisher,
  isbn
) => {
  // const registerBookInfoParams = [title, img_url, author, publisher, isbn];
  const Bookconnection = await pool.getConnection(async (conn) => conn);
  const bookReigsterResult = await bookDao.registerBookInfo(Bookconnection, [
    user_id, // 추가
    title,
    img_url,
    author,
    publisher,
    isbn,
  ]);

  //const registerBookShelfParams = [parseInt(user_id), parseInt(book_id)];
  //const Shelfconnection = await pool.getConnection(async (conn) => conn);
  //const bookReigsterResult2 = await bookDao.registerBookShelf(Shelfconnection, [
  //  parseInt(user_id),
  //  parseInt(book_id),
  //]);

  Bookconnection.release();

  return response(baseResponse.SUCCESS);
};
