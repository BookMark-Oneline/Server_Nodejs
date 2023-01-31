const { errResponse, response } = require("../../config/response");
const baseResponse = require("../../config/baseResponse");
const pool = require('../../config/database');
const { updateClubSettingInfo, insertClubInfo, insertUserRequest, updateUserStatusInfo, deleteUserStatusInfo } = require('../../dao/club/postDao');



module.exports.editClubSetting = async ( 
    club_name, 
    club_img_url, 
    club_invite_option,
    max_people_num,
    club_id) => {
        const updateClubSettingInfoParams = [ 
            club_name, 
            club_img_url, 
            club_invite_option, 
            max_people_num,
            parseInt(club_id)];
        const connection = await pool.getConnection(async (conn) => conn);
        const clubSettingResult = await updateClubSettingInfo(connection, 
            updateClubSettingInfoParams)
        connection.release();
        return response(baseResponse.SUCCESS);

}

module.exports.createClub = async(
    club_name,
    club_img_url,
    club_invite_option,
    max_people_num,
    club_owner_id
) => {
    const insertClubInfoParams = [club_name, club_img_url, club_invite_option, max_people_num, club_owner_id];
    
    const connection = await pool.getConnection(async conn => conn);
    const newClubResult = await insertClubInfo(connection, 
        insertClubInfoParams
    );

    connection.release();
    return response(baseResponse.SUCCESS); 
};

module.exports.createUserRequest = async(club_id, user_id) => {
    const connection = await pool.getConnection(async conn => conn);
    const userRequestResult = await insertUserRequest(connection, 
        [club_id, user_id])
    connection.release();
    return response(baseResponse.SUCCESS); 
 
}

module.exports.updateUserStatus = async(user_id, club_id) => {    
    const connection = await pool.getConnection(async (conn) => conn);
    const updateUserStatusResult = await updateUserStatusInfo(connection, 
        [user_id, club_id]
    );

    connection.release();
    return response(baseResponse.SUCCESS); 

}

module.exports.deleteUserStatus = async(user_id, club_id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const deleteUserStatusResult = await deleteUserStatusInfo(connection, 
        [user_id, club_id]
    );
    connection.release();
    return response(baseResponse.SUCCESS); 

}