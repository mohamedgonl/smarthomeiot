

const express = require('express')
const { createRoom, getRoomData } = require('../controllers/roomControl')
const route = express.Router()
route.get('/:roomId',getRoomData)
route.post('/',createRoom)

module.exports = route