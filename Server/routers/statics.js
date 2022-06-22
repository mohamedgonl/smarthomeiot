const express = require('express')
const { dayStatics, weekStatics, monthStatics, getLastHour } = require('../controllers/statics')
const router = express.Router()

router.get('/:type/:time',getLastHour)


module.exports = router