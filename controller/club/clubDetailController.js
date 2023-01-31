const baseResponse = require("../../config/baseResponse");
const clubDetailProvider = require("../../provider/club/clubDetailProvider");

/*
 * API No. 6
 * API Name : 책 모임의 이름, 공지, 게시글 목록을 조회 API
 * [POST] /:club_id
 */
module.exports.clubDetail = async (req, res) => {
  try {
    const { club_id } = req.params;

    if (!club_id){
        res.send("This is not proper club_id");
    } else {
      const DetailResponse = await clubDetailProvider.clubDetail(
        club_id,
      );
      console.log(DetailResponse);
      return res.send(DetailResponse);
    }
  } catch (err) {
    console.log("Error", err);
    //오류 메시지 반환.
    return res.status(res.statusCode).send(err._message);
  }
};

