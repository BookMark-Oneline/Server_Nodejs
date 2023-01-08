const pool = require('../../config/database');
const bookDao = require("../../dao/myShelf/bookDao");
const { errResponse, response } = require("../../config/response");
const baseResponse = require('../../config/baseResponse');



exports.deleteBook = async (book_id, user_id) => {

    const connection = await pool.getConnection(async (conn) => conn);

    const bookIdResult = await bookDao.deleteBookInfo(connection,book_id,user_id);
    
    connection.release();
    return response(baseResponse.SUCCESS);
}