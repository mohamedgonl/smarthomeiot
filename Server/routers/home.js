const express = require('express')
const { getHomeData, createRoom, deleteRoom } = require('../controllers/homeControl')


const router = express.Router()

router.get('/:accountId',getHomeData)
router.delete('/deleteroom/:homeId/:roomId',deleteRoom)
module.exports = router