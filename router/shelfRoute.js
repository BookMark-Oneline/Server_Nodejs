const express = require('express');
const router = express.Router();
const shelf = require('../controller/shelfController');


router.route('/:user_id').get(shelf.findMyAllBooks);


module.exports = router; 
