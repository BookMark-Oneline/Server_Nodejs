const { errResponse, response } = require("../../config/response");
const baseResponse = require("../../config/baseResponse");
const regexEmail = require("regex-email");
const {
  findAlreadyUser,
  userCheck,
} = require("../../provider/user/userProvider");
const { createUser, postSignIn } = require("../../service/user/userService");
const bcrypt = require("bcrypt");
const jwt = require("../../auth/jwtMiddleware");
const redisClient = require("../../config/redis");

module.exports.postRegister = async (req, res) => {
  const { name, user_name, email, introduce_message, password } = req.body;

  const alreadyExist = await findAlreadyUser(user_name, email);
  if (alreadyExist.length > 0) {
    return res
      .status(400)
      .json({ message: "This username/email is already taken." });
  }

  if (!email) return res.send(response(baseResponse.SIGNIN_EMAIL_EMPTY));

  // 길이 체크
  if (email.length > 30)
    return res.send(response(baseResponse.SIGNIN_EMAIL_LENGTH));

  // 형식 체크
  if (!regexEmail.test(email))
    return res.send(response(baseResponse.SIGNIN_EMAIL_ERROR_TYPE));

  try {
    const newUser = await createUser(
      name,
      user_name,
      email,
      introduce_message,
      password
    );
    return res.status(200).send(newUser);
  } catch (err) {
    console.log("Err", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
};

module.exports.postLogin = async (req, res) => {
  try {
    const { name, password } = req.body;
    const loginResponse = await postSignIn(name, password);

    return res.status(200).json({ loginResponse });
  } catch (err) {
    console.log("Err", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
};

module.exports.logout = async (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
