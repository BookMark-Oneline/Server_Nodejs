const express = require("express");
const router = express.Router();
const postController = require("../../controller/club/postController");

router.route("/like/:club_post_id").post(postController.changeLike);
router.route("/register/notice/:club_id").post(postController.announcement);
router.route("/comment/:club_post_id").post(postController.comment);
module.exports = router;
