const baseResponse = require("../../config/baseResponse");
const clubMemberProvider = require("../../provider/club/clubMemberProvider");

/*
 * API No. 5
 * API Name : 책 모임 소속 회원 정보 조회 API
 * [POST] /member
 */
module.exports.clubMember = async (req, res) => {
  try {
    const { club_id } = req.params;

    //const { user_id } = req.body.user_id; 없어도 되나요?

    if (!club_id){
        res.send("This is not proper club_id");
    } else {
      const MemberResponse = await clubMemberProvider.clubMember(
        club_id,
      );
      console.log(MemberResponse);
      return res.send(MemberResponse);
    }
  } catch (err) {
    console.log("Error", err);
    //오류 메시지 반환.
    return res.status(res.statusCode).send(err._message);
  }
};

