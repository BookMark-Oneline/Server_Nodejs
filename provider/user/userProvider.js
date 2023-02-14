const pool = require('../../config/database');
const { selectAlreadyUser,  selectUser, selectUserPassword, selectAlreadyUserHasAccessToken } = require('../../dao/user/userDao');

module.exports.findAlreadyUser = async (user_name,email) => {
    const selectAlreadyUserInfoParams = [user_name, email];
    const connection = await pool.getConnection(async coon => coon);
    const AlreadyUserResult = await selectAlreadyUser(connection, selectAlreadyUserInfoParams);
    connection.release();
    console.log(AlreadyUserResult);
    return AlreadyUserResult;

}

module.exports.findAlreadyUserHasAccessToken = async(access_token) => {
    const connection = await pool.getConnection(async coon => coon);
    const AlreadyUserHasAccessTokenResult = await selectAlreadyUserHasAccessToken(connection, access_token);
    connection.release();
    return AlreadyUserHasAccessTokenResult

}



module.exports.userCheck = async (name) =>{
    const connection = await pool.getConnection(async conn => conn);
    const userNameCheckResult = selectUser(connection, name);

    connection.release();
    return userNameCheckResult;
}


module.exports.passwordCheck = async(selectUserPasswordParams) => {
    const connection = await pool.getConnection(async conn => conn);
    const passwordCheckResult = await selectUserPassword(
        connection,selectUserPasswordParams
    );

    connection.release();
    return passwordCheckResult[0];


    }
