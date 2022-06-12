const express = require('express')
const { receiveData, getData } = require('../controllers/handleData')
const router = express.Router()

router.post('/receiveData',receiveData)
router.get('/getData',getData)

module.exports = router