const express = require('express')
const router = express.Router()
const {refresh} = require('../controllers/refreshController')
const verifyAuth = require('../middleware/verifyAuth')


router.use(verifyAuth)

router.get('/', refresh)


module.exports = router