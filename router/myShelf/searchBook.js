const express = require('express');
const router = express.Router();
const mybook = require('../../controller/myShelf/searchBook');

//cache되어 있으면 get 미들웨어에서 데이터 반환.
router.route('/book/:user_id').get(mybook.searchBook);

module.exports = router; 

