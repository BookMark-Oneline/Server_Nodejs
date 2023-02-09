module.exports.selectAlreadyUser = async(connection, selectAlreadyUserInfoParams) => {
    const selectAlreadyUserInfoQuery = `
    SELECT * FROM UserInfo WHERE user_name=? AND email=?;`;
    
    const [selectAlreadyUserInfoRow]= await connection.query(
        selectAlreadyUserInfoQuery, 
        selectAlreadyUserInfoParams)
    console.log(selectAlreadyUserInfoRow)
    return selectAlreadyUserInfoRow;

}


module.exports.insertNewUserInfo = async(connection, insertUserInfoParams) => {
    const insertNewUserInfoQuery = `
    INSERT 
    INTO UserInfo 
    (name, user_name, email, introduce_message, password) 
    VALUES (?,?,?,?,?);`;
    const [insertNewUserInfoRow] = await connection.query(insertNewUserInfoQuery,
        insertUserInfoParams);
    return insertNewUserInfoRow;
} 


module.exports.selectUser = async (connection, name) => {
    const selectUserNameQuery = `SELECT user_id, name, email, user_name, password FROM UserInfo WHERE name= ?;`;
    const [userRows] = await connection.query(selectUserNameQuery, [name]);
    return userRows;

};

module.exports.selectUserPassword = async(connection, selectUserPasswordParams) => {
    const selectUserPasswordQuery = `
    SELECT email, user_name, password
    FROM UserInfo 
    WHERE name = ? AND password = ?;`;
    
    const selectUserPasswordRow = await connection.query(
        selectUserPasswordQuery,
        selectUserPasswordParams
    );
    
    return selectUserPasswordRow;
}
