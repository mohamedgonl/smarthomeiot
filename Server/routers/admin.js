const express = require('express')
const deleteAll = require('../controllers/adminController')
const router = express.Router()

router.delete('/deleteall/:e',deleteAll)

module.exports = router