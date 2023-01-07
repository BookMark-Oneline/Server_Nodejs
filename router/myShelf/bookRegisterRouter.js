const express = require('express');
const router = express.Router();
const registerbook = require('../../controller/myShelf/bookRegisterController');

router.route('/book/:user_id').post(registerbook.registerBooks);

module.exports = router;