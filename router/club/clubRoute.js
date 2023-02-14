const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  findClubSetting,
  postEditClubSetting,
  postNewClub,
  findRequestingMembers,
  approvalToJoinRequest,
  declineToJoinRequest,
  postJoinRequest,
} = require("../../controller/club/clubController");
const imgUploader = require("../../utils/imageUploader");
//const { redisGet } = require("../../config/redis");
const {
  clubSearch,
  clubMember,
  clubDetail,
  userBelong,
} = require("../../controller/club/clubController");
// JWT Verify.
//const { authJWT } = require('../../config/auth');
// Redis Cache.
//const { get } = require('../../utils/cache');

router.route("/setting/:club_id").get(findClubSetting);
router.route('/register').post(imgUploader.single("club_img_url"), postNewClub);
router
  .route("/setting/edit/:club_id")
  .post(imgUploader.single("club_img_url"), postEditClubSetting);
router.route("/members/request/:club_id").get(findRequestingMembers);
router.route("/request/:club_id").post(postJoinRequest);
router.route("/members/approval/:user_id").post(approvalToJoinRequest);
router.route("/members/decline/:user_id").delete(declineToJoinRequest);

router.route("/user/:user_id").get(userBelong); // 2-1   사용자(userid)가 속한 책모임을 조회함
router.route("/:club_id").get(clubDetail); // 2-2    책 모임의 이름, 공지, 게시글 목록을 조회함
router.route("/member/:club_id").get(clubMember); // 2-5    책 모임의 소속 회원의 이름, 상태메시지, 현재 상태를 조회함
// router.route("/request/:club_id").post(clubRequest); // 2-9 책 모임에 가입요청을 보냄
router.route("/search/:club_id").get(clubSearch); // 2-10 책 모임을 검색하여 조회함

module.exports = router;
