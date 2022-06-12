const express = require('express')
const { control } = require('../controllers/controlDevices')
const { createDevice, deleteDevice } = require('../controllers/handleDevices')

const router = express.Router()

router.post('/create',createDevice)
router.post('/control',control)
router.post('/delete',deleteDevice)
module.exports = router