const baseResponse = require("../../config/baseResponse");
const clubRequestService = require("../../service/club/clubRequestService");

/*
 * API No. 3
 * API Name : 책 모임 가입 요청 전송 API
 * [POST] /request
 */
module.exports.clubRequest = async (req, res) => {
  try {
    const { club_id } = req.params;
    const { user_id } = req.body.user_id;

    if (!user_id) {
      res.send(response(baseResponse.USER_USERID_EMPTY));
    } else if (!club_id){
        res.send("This is not proper club_id");
    } else {
      const RequestResponse = await clubRequestService.clubRequest(
        user_id,
        club_id,
      );
      console.log(RequestResponse);
      return res.send(RequestResponse);
    }
  } catch (err) {
    console.log("Error", err);
    //오류 메시지 반환.
    return res.status(res.statusCode).send(err._message);
  }
};

