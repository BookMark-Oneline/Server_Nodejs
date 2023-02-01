const express = require("express");
const router = express.Router();
const postController = require("../../controller/club/postController");
const imageUploader = require("../../controller/club/imageUploader");

router.route("/like/:club_post_id").post(postController.changeLike);
router.route("/register/notice/:club_id").post(postController.announcement);
router.route("/comment/:club_post_id").post(postController.comment);
router
  .route("/register/:club_id")
  .post(imageUploader.single("img"), postController.post);

module.exports = router;
