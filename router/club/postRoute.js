const express = require("express");
const router = express.Router();
const postController = require("../../controller/club/postController");
// 진철님 aws s3 이미지 업로드 코드와 통일할 경우
// const { imgUpload } = require("../../utils/middelware");
const imgUpload = require("../../utils/imageUploader");

router.route("/like/:club_post_id").post(postController.changeLike);
router.route("/register/notice/:club_id").post(postController.announcement);
router.route("/comment/:club_post_id").post(postController.comment);
router
  .route("/register/:club_id")
  .post(imgUpload.single("img"), postController.post);
router.route("/:club_post_id").get(postController.viewPost);

module.exports = router;
