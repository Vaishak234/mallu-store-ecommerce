const express = require('express')
const router = express.Router()
const verifyAuth = require('../middleware/verifyAuth')
const { addAddress, getAddress,removeOrder, editAddress ,getOrders} = require('../controllers/userController')

router.use(verifyAuth)

router.post('/add-address', addAddress)
router.post('/edit-address', editAddress)


router.get('/get-address', getAddress)

router.get('/orders', getOrders)

router.get('/remove-order/:id', removeOrder)





module.exports = router