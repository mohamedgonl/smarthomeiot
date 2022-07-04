

const express = require('express')
const { createRoom, getRoomData, getTemperature, removeDevice, getHumidity, addExitedDevice } = require('../controllers/roomControl')
const route = express.Router()

route.get('/:roomId',getRoomData)
route.get('/temperature/:roomId',getTemperature)
route.get('/humidity/:roomId',getHumidity)
route.post('/',createRoom)
route.post('/adddevice',addExitedDevice)
route.delete('/:roomId/:deviceId',removeDevice)
module.exports = route