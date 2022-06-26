const express = require('express')
const {login, register, changePassword, updateInfo, getAccountInfo} = require('../controllers/accountControl')
const router = express.Router()

router.post('/login', login);
router.post('/', register);
router.post('/change-password',changePassword);
router.put('/:accountId',updateInfo);
router.get('/:accountId',getAccountInfo)
module.exports = router
