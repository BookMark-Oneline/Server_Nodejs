const express = require('express');
const router = express.Router();
const mybook = require('../../controller/myShelf/searchBook');

router.route('/book/:user_id').get(mybook.searchBook);

module.exports = router; 

