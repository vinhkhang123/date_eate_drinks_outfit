const express = require('express');
const router = express.Router();
const sheetController = require('../app/controllers/sheetController');

router.get('/', sheetController.index); // /food
module.exports = router;
