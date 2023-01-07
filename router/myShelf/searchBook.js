const express = require('express');
const router = express.Router();
const mybook = require('../../controller/myShelf/searchBook');

router.route('/book').get(mybook.searchBook);

module.exports = router; 

