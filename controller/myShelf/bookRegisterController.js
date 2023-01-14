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
          const { book_id, title, img_url, author, publisher, isbn } = req.body;
        if(!user_id) {
          res.send(response(baseResponse.USER_USERID_EMPTY))
        }
        else{
          const registerResponse = await bookService.registerBook(
            user_id,
            book_id,
            title,
            author,
            publisher,
            img_url,
            isbn,
            ///////status 도 넣어야함 null 값이면 안됨 , 동록 시 1로 설정해줘야함.
            );
          console.log(registerResponse);
          return res.send(registerResponse);
        }
      
      }
    catch (err) {
      console.log("Error", err);
      //오류 메시지 반환.
      return res.status(res.statusCode).send(err._message);
    }
  };