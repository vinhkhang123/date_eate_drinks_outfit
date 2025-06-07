const express = require('express')
const router = express.Router()

const newsControllers = require('../app/controllers/newController')
router.get('/',newsControllers.index)
module.exports = router 