

module.exports.registerBookInfo = async (connection,registerBookInfoParams) => {
    try{
      const registerBookInfoQuery = `INSERT INTO BookInfo(user_id, title, author, publisher, img_url, status) VALUES (?, ?, ?, ?, ?, 1);`;
      const registerBookInfoRow = await connection.query(registerBookInfoQuery, registerBookInfoParams)
      console.log(registerBookInfoRow);
      return registerBookInfoRow;
    }
    catch(err){
      console.log(err)
      return res.status(404).send(err._message);
    }
    
  };


  module.exports.deleteBookInfo = async (connection, deleteBookInfoParams) => {    // Params
    try {
      const deleteBookInfoQuery = `UPDATE BookInfo SET status=? WHERE book_id=? and user_id=?;`;
      const deleteBookInfoRow  = await connection.query(deleteBookInfoQuery, 0, deleteBookInfoParams);
      console.log(deleteBookInfoRow);
      return deleteBookInfoRow;
    }
    catch(err) {
      console.log(err);
      return res.status(404).send(err._message);
    }
    
};
