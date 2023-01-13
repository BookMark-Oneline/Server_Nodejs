const pool = require('../../config/database');
const bookDao = require("../../dao/myShelf/bookDao");
const { errResponse, response } = require("../../config/response");
const baseResponse = require('../../config/baseResponse');



exports.deleteBook = async (book_id, user_id) => {

    const deleteBookInfoParams = [book_id, user_id];
    const connection = await pool.getConnection(async (conn) => conn);
    const bookIdResult = await bookDao.deleteBookInfo(connection,deleteBookInfoParams);
    
    connection.release();

    return response(baseResponse.SUCCESS);
}