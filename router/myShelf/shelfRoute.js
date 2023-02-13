const express = require('express');
const router = express.Router();
const { findMyAllBooks, searchBookDetail } = require('../../controller/myShelf/shelfController');
//const { redisGet } = require('../../config/redis');

router.route('/:user_id').get(findMyAllBooks);
router.route('/book/:book_id').get(searchBookDetail);

module.exports = router; 
