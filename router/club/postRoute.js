const express = require('express');
const multer = require('multer');
const router = express.Router();
const { findClubSetting, 
        postEditClubSetting, 
        postNewClub, 
        findRequestingMembers, 
        approvalToJoinRequest,
        declineToJoinRequest,
        postJoinRequest } = require('../../controller/club/postController');

const { imgUpload } = require('../../middelware');      

router.route('/setting/:club_id').get(findClubSetting);
router.route('/register').post(imgUpload.single("club_img_url"), postNewClub);
router.route('/setting/edit/:club_id').post(imgUpload.single("club_img_url"), postEditClubSetting)
router.route('/members/request/:club_id').get(findRequestingMembers);
router.route('/request/:club_id').post(postJoinRequest)
router.route('/members/approval/:user_id').post(approvalToJoinRequest)
router.route('/members/decline/:user_id').delete(declineToJoinRequest)


module.exports = router; 
