const express = require("express");
const router = express.Router();
const clubRequestController = require("../../controller/club/clubRequestController");

router.route("/request/:club_id").post(clubRequestController.clubRequest);

module.exports = router;
