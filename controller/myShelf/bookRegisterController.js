const baseResponse = require("../../config/baseResponse");
const bookService = require("../../service/myShelf/bookRegisterService");

/*
 * API No. 1
 * API Name : 책 등록 API
 * [POST] /book
 */
module.exports.registerBooks = async (req, res) => {
  try {
    const { user_id } = req.params;
    //const { title, author, publisher, img_url }  = req.body;
    const { title, img_url, author, publisher, isbn } = req.body;
    if (!user_id) {
      res.send(response(baseResponse.USER_USERID_EMPTY));
    } else {
      const registerResponse = await bookService.registerBook(
        user_id,
        title,
        img_url,
        author,
        publisher,
        isbn
      );
      console.log(registerResponse);
      return res.send(registerResponse);
    }
  } catch (err) {
    console.log("Error", err);
    //오류 메시지 반환.
    return res.status(500).json({
      status: 'error',
      message: err.message
  });  }
};

