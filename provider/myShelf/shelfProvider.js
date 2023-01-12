const { selectBooks , selectBookDetail} = require('../../dao/myShelf/shelfDao');
const pool = require('../../config/database')

exports.retrieveBookList = async(user_id) => {
    try { 
    const connection = await pool.getConnection(async conn => conn);
    const bookListResult = await selectBooks(connection, user_id);
    connection.release();
    return bookListResult[0]; 
    } catch (err) {
        return res.send(err._messsage);
    }
};


exports.retrieveBookDetail = async(book_id) => {
    try { 
    const connection = await pool.getConnection(async conn => conn);
    const bookDetailResult = await selectBookDetail(connection, book_id);
    connection.release();
    return bookDetailResult[0];
    } catch(err) {
        console.log(err)
        return res.send(err._messsage);
    }

}