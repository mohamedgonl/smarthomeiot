const express = require('express')
const { dayStatics, weekStatics, monthStatics, getLastHour, getlast100 } = require('../controllers/statics')
const router = express.Router()

router.get('/:type/:time',getLastHour)
router.get('/getlast100/:type', getlast100)

module.exports = router