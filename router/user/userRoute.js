const express = require("express");
const router = express.Router();
const {
   postLogin,
   postRegister,
   authAppleLogin,
   logout, } = require("../../controller/user/userController");
const refresh  = require('../../config/refreshToken');
const imageUploader = require('../../utils/imageUploader');


router.route('/login').post(postLogin);
router.route('/login/register').post(imageUploader.single("img_url"), postRegister)
// router.route('/logout').post(logout)
// router.get('/refresh', refresh);



module.exports = router;
