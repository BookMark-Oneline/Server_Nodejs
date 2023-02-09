const express = require('express');
const router = express.Router();
const shelf = require('../../controller/myShelf/shelfController');
const { get } = require('../../config/redis');

router.route('/:user_id', get).get(shelf.findMyAllBooks);
router.route('/book/:book_id').get(shelf.searchBookDetail);

module.exports = router; 
