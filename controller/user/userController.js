require("dotenv").config();

const { errResponse, response } = require("../../config/response");
const baseResponse = require("../../config/baseResponse");
const regexEmail = require("regex-email");
const { findAlreadyUser, findUserId, findAlreadyUserHasAccessToken } = require("../../provider/user/userProvider");
const { createUser, postSignIn } = require("../../service/user/userService");





module.exports.postRegister = async (req, res) => {
  try {
  const { access_token, user_name, introduce_message, goal } = req.body;
  const img_url = req.file.location;

  const alreadyExist = await findAlreadyUser(user_name);
  if (alreadyExist.length > 0) {
    return res
      .status(400)
      .json({ message: "This username is already taken." });
  }

//  if (!email) return res.send(response(baseResponse.SIGNIN_EMAIL_EMPTY));

  // 길이 체크
//  if (email.length > 30)
//    return res.send(response(baseResponse.SIGNIN_EMAIL_LENGTH));

  // 형식 체크
//  if (!regexEmail.test(email))
//    return res.send(response(baseResponse.SIGNIN_EMAIL_ERROR_TYPE));


    const newUser = await createUser(
      user_name,
      img_url,
      introduce_message,
      goal,
      access_token
    );

    return res.status(200).json({ newUser });


  } catch (err) {
    console.log("Err", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
};

module.exports.postLogin = async (req,res) => {

try {
    const { access_token } = req.body;
    const userId = await findAlreadyUserHasAccessToken(access_token);
    if (userId.length > 0) {
      return res.status(200).json({ message:" 기등록된 유저 입니다.", userId: userId })
    }
    
    if (userId.length <= 0) return res.status(200).json({ message:" 등록되지 않은 유저입니다. " })

    

    } catch (err) {
        console.log("Err", err);
        return res.status(500).send({
            status : "error",
            message : err.message,
        })
  };
}





module.exports.logout = async (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

