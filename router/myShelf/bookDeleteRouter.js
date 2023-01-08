const express = require('express');
const router = express.Router();
const deletebook = require('../../controller/myShelf/bookDeleteController');

router.route('/book/:user_id/:book_id').delete(deletebook.deleteBooks);
module.exports = router; 