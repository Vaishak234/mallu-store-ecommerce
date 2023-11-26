const express = require('express')
const router = express.Router()
const { getAllUsers, getAllProducts } = require('../controllers/adminControllers')


router.get('/all-users', getAllUsers)

router.get('/all-products', getAllProducts)





module.exports = router