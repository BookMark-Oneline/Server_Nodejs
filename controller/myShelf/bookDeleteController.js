const { response } = require("express");
const baseResponse = require("../../config/baseResponse");
const bookService = require("../../service/myShelf/bookDeleteService");

/*
 * API No. 2
 * API Name : 책 삭제 API
 * [POST] /book
 */
 module.exports.deleteBooks = async (req, res) => {
    try {
        const { book_id } = req.params;
        const { user_id } = req.params;
        
        if (!book_id){
          res.send(response(baseResponse.BOOK_BOOKID_EMPTY))
        }
        else if(!user_id) {
          res.send(response(baseResponse.USER_USERID_EMPTY))
        }
        else {
          const deleteResponse = await bookService.deleteBook(
            book_id, 
            user_id, 
            );
          console.log(deleteResponse);
          return res.send(deleteResponse);
        }
      }
    catch (err) {
      console.log("Error", err);
      //오류 메시지 반환.
      return res.status(res.statusCode).send(err._message);
    }
  };