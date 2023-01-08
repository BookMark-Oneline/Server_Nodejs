const bookService = require("../../service/myShelf/bookDeleteService");

/**
 * API No. 2
 * API Name : 책 삭제 API
 * [POST] /book
 */
 module.exports.deleteBooks = async (req, res) => {
    try {
        const { book_id } = req.params;
        const { user_id } = req.params;
        // Q book_id도 숫자로 params로 받나요?
        
        const deleteResponse = await bookService.deleteBook(
            book_id, 
            user_id,
        );
        console.log(deleteResponse);
        return res.send(deleteResponse);
      }
    catch (err) {
      console.log("Error", err);
    }
  };