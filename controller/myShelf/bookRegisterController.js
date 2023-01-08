const bookService = require("../../service/myShelf/bookRegisterService");


module.exports.registerBooks = async (req, res) => {
    try {
        const { user_id } =req.params; 
        const { title, author, publisher, img_url }  = req.body;
  
        const registerResponse = await bookService.registerBook(
            user_id,
            title,
            author,
            publisher,
            img_url,
            ///////status 도 넣어야함 null 값이면 안됨 , 동록 시 1로 설정해줘야함.
        );
        console.log(registerResponse);
        return res.send(registerResponse);
      
      }
    catch (err) {
      console.log("Error", err);
    }
  };