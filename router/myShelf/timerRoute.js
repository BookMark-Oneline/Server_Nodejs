const express = require("express");
const router = express.Router();
const timer = require("../../controller/myShelf/timerController");


router.route("/start/:user_id/:book_id").post(timer.startTimer);
router.route("/finish/:user_id/:book_id").post(timer.finishTimer);

module.exports = router;