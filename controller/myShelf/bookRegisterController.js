const bookService = require("../../service/myShelf/bookRegisterService");


module.exports.registerBooks = async (req, res) => {
    try {
        const { user_id } =req.params; 
        const title = req.body.title;
        const author = req.body.author;
        const publisher = req.body.publisher;
        const img_url = req.body.img_url;
        //var status = req.body.status;
        // const title = parseInt(req.params.title);
        // var total_reading_time = parseInt(req.body.total_reading_time);
        //const register = parseInt(req.params.register);
        //const status = parseInt(req.params.status);
        const registerResponse = await bookService.registerBook(
            user_id,
            title,
            author,
            publisher,
            img_url,
        );
        res.send("책 등록 완료");
      }
    catch (err) {
      console.log("Error", err);
    }
  };