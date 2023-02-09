const baseResponse = require("../../config/baseResponse");

// const { clubRequest } = require("../../service/club/clubService");
const { clubSearch, clubMember, clubDetail, userBelong } = require("../../provider/club/clubProvider");


/*
 * API No. 2-1
 * API Name : 책 모임 소속 회원 정보 조회 API
 * [GET] /member
 */
module.exports.clubMember = async (req, res) => {
  try {
    const { club_id } = req.params;

    //const { user_id } = req.body.user_id; 없어도 되나요?

    if (!club_id){
        res.send("This is not proper club_id");
    } else {
      const MemberResponse = await clubMember(
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


/*
 * API No. 2 - 2
 * API Name : 책 모임의 이름, 공지, 게시글 목록을 조회 API
 * [GET] /:club_id
 */
module.exports.clubDetail = async (req, res) => {
    try {
      const { club_id } = req.params;
  
      if (!club_id){
          res.send("This is not proper club_id");
      } else {
        const DetailResponse = await clubDetail(
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
  

  /*
 * API No. 2-5
 * API Name : 사용자(userid)가 속한 책모임을 조회함
 * [GET] /user/:user_id
 */
module.exports.userBelong = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      if (!user_id){
          res.send("This is not proper user_id");
      } else {
        const BelongResponse = await userBelong(
          user_id,
        );
        console.log(BelongResponse);
        return res.send(BelongResponse);
      }
    } catch (err) {
      console.log("Error", err);
      //오류 메시지 반환.
      return res.status(res.statusCode).send(err._message);
    }
  };


/*
 * API No. 2-9
 * API Name : 책 모임 가입 요청 전송 API
 * [POST] /request
 */
// module.exports.clubRequest = async (req, res) => {
//   try {
//     const club_id = parseInt(req.params.club_id);
//     const user_id = parseInt(req.body.user_id);

//     if (!user_id) {
//       res.send(response(baseResponse.USER_USERID_EMPTY));
//     } else if (!club_id){
//         res.send("This is not proper club_id");
//     } else {
//       const RequestResponse = await clubRequest(
//         user_id,
//         club_id,
//       );
//       console.log("가입 요청 성공하였습니다.");
//       //return res.send(RequestResponse);
//       return res.status(200).json({ message: '가입 요청 성공하였습니다. ! '});
//     }
//   } catch (err) {
//     console.log("Error 입니다.", err);
//     //오류 메시지 반환.
//     return res.status(res.statusCode).send(err._message);
//   }
// };


/*
 * API No. 2 - 10
 * API Name : 책 모임 조회 API
 * [GET] /request
 */
module.exports.clubSearch = async (req, res) => {
  try {
    const { club_id } = req.params;

    //const { user_id } = req.body.user_id; 없어도 되나요?

    if (!club_id){
        res.send("This is not proper club_id");
    } else {
      const SearchResponse = await clubSearch(
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
