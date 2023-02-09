const express = require("express");
const router = express.Router();
const postController = require("../../controller/club/postController");
const { imgUpload } = require("../../utils/middelware");
// 진철님 코드 const { imgUpload } = require("../../utils/middelware");

router.route("/like/:club_post_id").post(postController.changeLike);
router.route("/register/notice/:club_id").post(postController.announcement);
router.route("/comment/:club_post_id").post(postController.comment);
router
  .route("/register/:club_id")
  .post(imgUpload.single("img"), postController.post);
router.route("/:club_post_id").get(postController.viewPost);

module.exports = router;
