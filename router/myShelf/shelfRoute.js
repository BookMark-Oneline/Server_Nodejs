const express = require('express');
const router = express.Router();
const shelf = require('../../controller/myShelf/shelfController');


router.route('/:user_id').get(shelf.findMyAllBooks);
router.route('/book/:user_id/:book_id').get(shelf.searchBookDetail);

module.exports = router; 
