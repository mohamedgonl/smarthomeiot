const express = require('express')
const { control, deleteDevice, createDevice, getDevice } = require('../controllers/deviceControl')

const router = express.Router()

router.post('/control',control)
router.delete('/',deleteDevice)
router.post('/',createDevice)
router.get('/:deviceId',getDevice)
module.exports = router