const express = require("express");
const router = express.Router();
const userBelongController = require("../../controller/club/userBelongController");

router.route("/user/:user_id").get(userBelongController.userBelong);

module.exports = router;
