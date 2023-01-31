const express = require("express");
const router = express.Router();
const clubSearchController = require("../../controller/club/clubSearchController");

router.route("/search/:club_id").get(clubSearchController.clubSearch);

module.exports = router;
