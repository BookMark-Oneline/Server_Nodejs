const baseResponse = require("../../config/baseResponse");
const userBelongProvider = require("../../provider/club/userBelongProvider");
/*
 * API No. 7
 * API Name : 사용자(userid)가 속한 책모임을 조회함
 * [POST] /user/:user_id
 */
module.exports.userBelong = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id){
        res.send("This is not proper user_id");
    } else {
      const BelongResponse = await userBelongProvider.userBelong(
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

