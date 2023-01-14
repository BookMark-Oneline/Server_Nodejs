const pool = require("../../config/database");
const bookDao = require("../../dao/myShelf/bookDao");
const { errResponse, response } = require("../../config/response");
const baseResponse = require('../../config/baseResponse');


// Service: Create, Update, Delete 비즈니스 로직 처리
exports.registerBook = async (user_id, book_id, title, img_url, author, publisher, isbn) => {

    // 여기서 user_id 제거?
    const registerBookInfoParams = [parseInt(book_id), title, img_url, author, publisher, isbn];
    const Bookconnection = await pool.getConnection(async (conn) => conn);
    const bookReigsterResult = await bookDao.registerBookInfo(Bookconnection,registerBookInfoParams);


    const registerBookShelfParams = [parseInt(user_id), parseInt(book_id)];
    const Shelfconnection = await pool.getConnection(async (conn) => conn);
    const bookReigsterResult2 = await bookDao.registerBookShelf(Shelfconnection,registerBookShelfParams);

    Bookconnection.release();

    return response(baseResponse.SUCCESS);

    
}

