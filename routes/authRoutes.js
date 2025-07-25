const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/check-auth', authController.checkAuth)

module.exports = router