require("dotenv").config();
const pool = require('../../config/database');
const { errResponse, response } = require("../../config/response");
const baseResponse = require("../../config/baseResponse");
const crypto = require("crypto");
const jwt = require("../../auth/jwtMiddleware");
const bcrypt = require('bcrypt');
const { insertNewUserInfo } = require('../../dao/user/userDao');
const { userCheck,passwordCheck } = require('../../provider/user/userProvider');
const { rejects } = require("assert");
const { resolve } = require("path");
const redisClient = require('../../config/redis');

module.exports.createUser = async (
    name, 
    user_name, 
    email, 
    introduce_message, 
    password) => {

        const hashedPassword = await crypto.createHash("sha512").update(password).digest("hex");

        const insertUserInfoParams = [name, user_name, email, introduce_message, hashedPassword]

        const connection = await pool.getConnection(async (conn) => conn);

        const newUserResult = await insertNewUserInfo(connection, insertUserInfoParams);

        connection.release();
    
        return response(baseResponse.SUCCESS);


}


module.exports.postSignIn = async(name, password) => {
    

        //아이디 존재 여부 확인.
        const user = await userCheck(name);
        if (user.length < 1) return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);

        const selectName = user[0].name;

        //비밀번호 확인.
        const hashedPassword = await crypto.createHash("sha512")
        .update(password).digest("hex");
        const selectUserPasswordParams = [selectName, hashedPassword];
        const passswordRows = await passwordCheck(selectUserPasswordParams);

        if(passswordRows.length < 1 ) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

         // id,pw가 일치한다면,
            //access token과 refresh token 발급.
            const accessToken  = jwt.sign(user);
            const refreshToken = jwt.refresh();
    
            // 발급한 refresh token을 redis에 user_id를 key값으로 지정해 저장.
            redisClient.set(user.id, refreshToken);
            
            
    return response(baseResponse.SUCCESS, { 'userId' : user[0].user_id, 'accessToken' : accessToken , 'refreshToken' : refreshToken});



}