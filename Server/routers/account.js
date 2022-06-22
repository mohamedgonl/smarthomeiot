const express = require('express')
const {login, register, changePassword, updateInfo} = require('../controllers/accountControl')
const router = express.Router()

router.post('/login', login);
router.post('/', register);
router.post('/change-password',changePassword);
router.put('/:accountId',updateInfo);

module.exports = router
