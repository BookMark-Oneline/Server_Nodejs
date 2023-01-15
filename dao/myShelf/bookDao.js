module.exports.registerBookInfo = async (
  connection,
  [user_id, title, img_url, author, publisher, isbn]
) => {
  try {
    const registerBookInfoQuery =
      "INSERT INTO BookInfo (title, img_url, author, publisher, isbn, total_reading_time, current_reading_page, status, ave_reading_page, ave_reading_time) VALUES (?, ?, ?, ?, ?, 0, 0, 1, 0, 0);";
    const registerBookInfoRow = await connection.query(registerBookInfoQuery, [
      title,
      img_url,
      author,
      publisher,
      isbn,
    ]);
    // 위에서 insert 될 때 설정된 book_id
    // console.log(registerBookInfoRow[0].insertId);
    var book_id = registerBookInfoRow[0].insertId;
    try {
      //bookShelf 에도 등록
      const registerBookShelfQuery =
        "INSERT INTO BookShelf (user_id, book_id) VALUES (?,?);";

      const registerBookShelfRow = await connection.query(
        registerBookShelfQuery,
        [parseInt(user_id), parseInt(book_id)]
      );
      return registerBookShelfRow;
    } catch (err) {
      console.log(err);
      return res.status(404).send(err._message);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).send(err._message);
  }
};

/*
module.exports.registerBookShelf = async (
  connection,
  registerBookShelfParams
) => {
  try {
    const registerBookShelfQuery =
      "INSERT INTO BookShelf (user_id, book_id) VALUES (?,?);";

    // const registerBookInfoQuery = `INSERT INTO BookInfo(user_id, title, author, publisher, img_url, status) VALUES (?, ?, ?, ?, ?, 1);`;
    const registerBookShelfRow = await connection.query(
      registerBookShelfQuery,
      registerBookShelfParams
    );
    //console.log(registerBookShelfRow);
    return registerBookShelfRow;
  } catch (err) {
    console.log(err);
    return res.status(404).send(err._message);
  }
};
*/
module.exports.deleteBookInfo = async (connection, deleteBookInfoParams) => {
  // Params
  try {
    const deleteBookInfoQuery = `UPDATE BookInfo SET status=? WHERE book_id=? and user_id=?;`;
    const deleteBookInfoRow = await connection.query(
      deleteBookInfoQuery,
      0,
      deleteBookInfoParams
    );
    //console.log(deleteBookInfoRow);
    return deleteBookInfoRow;
  } catch (err) {
    console.log(err);
    return res.status(404).send(err._message);
  }
};
