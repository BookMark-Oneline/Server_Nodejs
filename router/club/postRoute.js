const express = require("express");
const router = express.Router();

const { clubRequest, 
    clubSearch, 
    clubMember, 
    clubDetail, 
    userBelong,
 } = require('../../controller/club/postController');

router.route("/user/:user_id").get(userBelong);    // 2-1   사용자(userid)가 속한 책모임을 조회함   -----> 성공
router.route("/:club_id").get(clubDetail);        // 2-2    책 모임의 이름, 공지, 게시글 목록을 조회함 -----> 성공
router.route("/member/:club_id").get(clubMember); // 2-5    책 모임의 소속 회원의 이름, 상태메시지, 현재 상태를 조회함 --> 성공
router.route("/request/:club_id").post(clubRequest); // 2-9 책 모임에 가입요청을 보냄   ---> 왜 안들어갈까요 실패.,
router.route("/search/:club_id").get(clubSearch);   // 2-10 책 모임을 검색하여 조회함   --> 게시글이 하나씩 가져와진다..



module.exports = router;
