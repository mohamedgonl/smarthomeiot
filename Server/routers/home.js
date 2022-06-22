const express = require('express')
const { getHomeData, createRoom } = require('../controllers/homeControl')


const router = express.Router()

router.get('/:accountId',getHomeData)
module.exports = router