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
const { redisClient } = require('../../config/redis');

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
try {
         //아이디 존재 여부 확인.
        const user = await userCheck(name);
        if (!user) return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);


        const selectName = user[0].name;

        //비밀번호 확인.
        const hashedPassword = await crypto.createHash("sha512")
        .update(password).digest("hex");

        const selectUserPasswordParams = [selectName, hashedPassword];
        const passswordRows = await passwordCheck(selectUserPasswordParams);

        if (passswordRows.password !== hashedPassword)
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);


        if(passswordRows) {
            const accessToken = jwt.sign(user);
            const refreshToken = jwt.refresh();

            
            redisClient.set(name, refreshToken)
            return response(baseResponse.SUCCESS, {'userId': user[0].user_id, 'AccessToken': accessToken, 'refreshToken': refreshToken });

        }
    } catch(err) {
        console.log(err);
    }
}