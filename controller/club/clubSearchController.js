const baseResponse = require("../../config/baseResponse");
const clubSearchProvider = require("../../provider/club/clubSearchProvider");

/*
 * API No. 4
 * API Name : 책 모임 조회 API
 * [POST] /request
 */
module.exports.clubSearch = async (req, res) => {
  try {
    const { club_id } = req.params;

    //const { user_id } = req.body.user_id; 없어도 되나요?

    if (!club_id){
        res.send("This is not proper club_id");
    } else {
      const SearchResponse = await clubSearchProvider.clubSearch(
        club_id,
      );
      console.log(SearchResponse);
      return res.send(SearchResponse);
    }
  } catch (err) {
    console.log("Error", err);
    //오류 메시지 반환.
    return res.status(res.statusCode).send(err._message);
  }
};

