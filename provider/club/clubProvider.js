const pool = require('../../config/database');
const { selectClubSetting, selectClub, selectUser, selectRequestingMembersInfo } = require('../../dao/club/clubDao');



module.exports.retrieveClubSetting = async(club_id) => {
    const connection = await pool.getConnection(async conn => conn);
    const clubSettingResult = await selectClubSetting(connection, club_id);
    connection.release();
    return clubSettingResult;

}

module.exports.findUser = async(user_id) => {
    const connection = await pool.getConnection(async coon => coon);
    const userResult = await selectUser(connection, user_id);
    connection.release();
    return userResult;

}

module.exports.findClub = async(club_id) => {
    const connection = await pool.getConnection(async coon => coon);
    const clubResult = await selectClub(connection, club_id);
    connection.release();
    return clubResult;
}



module.exports.retrieveRequestingMembers = async(club_id) => {
    const connection = await pool.getConnection(async conn => conn);
    const userInfoResult = await selectRequestingMembersInfo(connection, club_id);
    connection.release();
    return userInfoResult;
}