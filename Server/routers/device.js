const express = require('express')
const { control, deleteDevice, createDevice, getDevice, getData } = require('../controllers/deviceControl')

const router = express.Router()

router.post('/control',control)
router.delete('/',deleteDevice)
router.post('/',createDevice)
router.get('/:deviceId',getDevice)
router.get('/:type/:roomId',getData)


module.exports = router