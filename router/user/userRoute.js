const express = require('express');
const router = express.Router();
const { postLogin , postRegister, logout} = require('../../controller/user/userController');

router.route('/login').post(postLogin);
router.route('/register').post(postRegister)
router.route('/logout').post(logout)
module.exports = router;