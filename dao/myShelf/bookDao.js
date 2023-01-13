

module.exports.registerBookInfo = async (connection,registerBookInfoParams) => {
    //, register, status 없이,,? 
    const registerBookInfoQuery = `INSERT INTO BookInfo(user_id, title, author, publisher, img_url, status) VALUES (?, ?, ?, ?, ?, 1);`;
    const registerBookInfoRow = await connection.query(registerBookInfoQuery,registerBookInfoParams)
    
    console.log(registerBookInfoRow);

    return registerBookInfoRow;
  };


  module.exports.deleteBookInfo = async (connection, book_id, user_id) => {    
    const deleteBookInfoQuery = `UPDATE BookInfo SET status=? WHERE book_id=? and user_id=?;`;
    const deleteBookInfoRow  = await connection.query(deleteBookInfoQuery, [
      0, 
      book_id,
      user_id,
    ]);
    
    console.log(deleteBookInfoRow);

    return deleteBookInfoRow[0];
};
