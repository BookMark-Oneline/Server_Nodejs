require("dotenv").config();

const { errResponse, response } = require("../../config/response");
const baseResponse = require("../../config/baseResponse");
const regexEmail = require("regex-email");
const { findAlreadyUser, userCheck } = require("../../provider/user/userProvider");
const { createUser, postSignIn } = require("../../service/user/userService");
const { appleSign } = require('../../dao/user/userDao');
const path = require('path');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const AppleAuth = require('apple-auth');
const fs = require('fs');

const appleKey = require('../../config/apple.json');
const appleAuth = new AppleAuth(appleKey, fs.readFileSync('./config/AuthKey.p8').toString(), 'text');


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

module.exports.postLogin = async (req,res) => {

try {
    const { name , password } = req.body;
    const loginResponse = await postSignIn(name, password);
    
    if(loginResponse) {
        return res.status(200).json({ loginResponse })
    }

    } catch (err) {
        console.log("Err", err);
        return res.status(500).send({
            status : "error",
            message : err.message,
        })
  };
}




module.exports.authAppleLogin = async(req,res) => {

    try {
        
        //authenticate our code we recieved from apple login with our key file
        const response = await appleAuth.accessToken(req.body.code);

        // decode our token
        const idToken = jwt.decode(response.id_token);
        
        const user = {};
        user.id = idToken.sub;
        //extract email from idToken
        if (idToken.email) user.email = idToken.email;
        
        //check if user exists in the returned response from Apple
        //Apple returns the user only once, so you might want to save their details
        // in a database for future logins
        
        if (req.body.user) { 
          const { name } = JSON.parse(req.body.user);
          user.name = name;
        }
    
        res.json(user); // Respond with the user
      } catch (error) {
        console.log(error);
      }
    };


module.exports.logout = async (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
