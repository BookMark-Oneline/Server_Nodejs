const { errResponse, response } = require("../../config/response");
const  baseResponse = require( "../../config/baseResponse");
const { retrieveBookList , retrieveBookDetail} = require('../../provider/myShelf/shelfProvider')
const { set } = require('../../config/redis');
const redisClient  = require('../../config/redis');

// /shelf/:user_id  -> 서재 내 모든 책들 조회 API
module.exports.findMyAllBooks = async(req,res)=> {
    try {
        const { user_id } = req.params;
        const myBooks = await retrieveBookList(user_id)
        if(myBooks.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Invalid user_id'
            });
        } else {
            set(req.originalUrl, myBooks);
           return  res.status(200).json({
              ok: true,
              data: myBooks,
        });        
    };
        } catch(err) {
        console.log("Error" , err);
        //오류 메시지 반환.
        return res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
    
};



// shelf/book/:bookd_id -> 각각의 책 별 세부사항 조회 API
module.exports.searchBookDetail = async(req,res) => {
    try{
        const { book_id } = req.params;
        const bookDetail = await retrieveBookDetail(book_id);
        if(bookDetail.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Invalid book_id'
            });

        } else {
            return res.send(bookDetail);
        }

    } catch(err) {
        console.log("Error", err)
        return res.status(500).json({
            status: 'error',
            message: err.message
        });    }
}