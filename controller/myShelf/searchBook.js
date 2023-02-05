
const { errResponse, response } = require("../../config/response");
const  baseResponse = require( "../../config/baseResponse");
const { retrieveUserId } = require('../../provider/myShelf/searchBookProvider');
const { set } = require('../../config/redis');
const client_id = `${process.env.client_id}`
const client_secret = `${process.env.client_secret}`


// search/book -> book title or isbn으로 검색 API
module.exports.searchBook =  async(req,res) => {
    try {
    const { user_id } = req.params;
    const userId = await retrieveUserId(user_id);
    if(!userId) {
        res.send(response(baseResponse.USER_USERID_NOT_EXIST))
    } else {

    const api_url = 'https://openapi.naver.com/v1/search/book?query=' + encodeURI(req.query.query);
    var request = require('request');
    const options = {
        url: api_url,
        headers: {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, (error,response,body) => {
        if(!error && response.statusCode == 200) {
            const mydata = JSON.parse(body);
            const myData = mydata.items;
            if(myData.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Invalid ISBN'
                });
            } else {
                // 데이터 캐싱하고 response.
                set(req.originalUrl, myData);
                return res.status(200).json({ userId, myData });

            }
            
           
    } else {
            console.log(error)
            res.status(response.statusCode).send(response.message);
            console.log('error = ' + response.statusCode);
        }
    });
    }
    } catch(err) {
        console.log(err)
        res.status(404).json({ message: err.message });
    }
};

