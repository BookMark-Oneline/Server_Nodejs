const express = require('express');
const router = express.Router();
const { postLogin , postRegister, authAppleLogin, logout} = require('../../controller/user/userController');
const  refresh  = require('../../config/refreshToken');


router.route('/login').post(postLogin);
router.route('/register').post(postRegister)
router.route('/logout').post(logout)
router.get('/refresh', refresh);
router.post('/apple/auth', authAppleLogin)


module.exports = router;
