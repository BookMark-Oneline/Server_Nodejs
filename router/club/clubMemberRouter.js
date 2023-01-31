const express = require("express");
const router = express.Router();
const clubMemberController = require("../../controller/club/clubMemberController");

router.route("/search/:club_id").get(clubMemberController.clubMember);

module.exports = router;
