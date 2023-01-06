const { selectBooks } = require('../dao/shelfDao');
const pool = require('../config/database')

exports.retrieveBookList = async(user_id) => {
    const connection = await pool.getConnection(async conn => conn);
    const bookListResult = await selectBooks(connection, user_id);
    connection.release();

    return bookListResult[0];
};
