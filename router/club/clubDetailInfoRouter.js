const express = require("express");
const router = express.Router();
const clubDetailController = require("../../controller/club/clubDetailController");

router.route("/:club_id").get(clubDetailController.clubDetail);

module.exports = router;
