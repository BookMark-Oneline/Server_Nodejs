const { errResponse, response } = require("../../config/response");
const  baseResponse = require( "../../config/baseResponse");
const { retrieveBookList , retrieveBookDetail} = require('../../provider/myShelf/shelfProvider')

// /shelf/:user_id  -> 서재 내 모든 책들 조회 API
module.exports.findMyAllBooks = async(req,res)=> {
    try {
        const { user_id }= req.params;
        if(!user_id) {
            res.send(response(baseResponse.USER_USERID_EMPTY))
            
        }  else {
            const myBooks = await retrieveBookList(user_id)
            return res.send(myBooks);
        }
        
    } catch(err) {
        console.log("Error" , err);
        throw err;
    }
    
};

module.exports.searchBookDetail = async(req,res) => {
    try{
        const { book_id } = req.params;
        if (!book_id) {
            res.send(baseResponse.BOOK_BOOKID_EMPTY)
        } else {
            const bookDetail = await retrieveBookDetail(book_id);
            return res.send(bookDetail);
        }
    } catch(err) {
        console.log("Error", err)
        throw err;
    }
}