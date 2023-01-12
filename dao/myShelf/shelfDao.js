


module.exports.selectBooks = async (connection, user_id) =>{
    try {
    const selectBookQuery = `SELECT user_id, book_id, title, img_url, author FROM BookInfo WHERE user_id = ?;`;
    const [shelfRows] = await connection.query(selectBookQuery, user_id);
    console.log(shelfRows);
    return shelfRows;
    } catch(err) {
        console.log(err)
        return res.status(404).send(err._message);
    }
}

module.exports.selectBookDetail = async(connection, book_id) => {
    try {
    const selectBookDetailQuery = `SELECT user_id, img_url, title, author, publisher, ave_reading_time, ave_reading_page FROM BookInfo WHERE book_id = ?;`;
    const [bookDetailRows] = await connection.query(selectBookDetailQuery, book_id);
    console.log(bookDetailRows);
    return bookDetailRows;
    } catch(err) {
        console.log(err);
        return res.status(404).send(err._message);
    }
   
}



