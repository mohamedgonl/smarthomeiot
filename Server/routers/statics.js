const express = require('express')
const { dayStatics, weekStatics, monthStatics, getLastHour } = require('../controllers/statics')
const router = express.Router()

router.get('/lasthour',getLastHour)


module.exports = router