const express = require('express')
const router = express.Router()
const {signUp , login, logout, googleLogin} = require('../controllers/authControllers')

router.post('/signup', signUp)

router.post('/login', login)
router.post('/google-login',googleLogin)

router.post('/logout', logout)


module.exports = router