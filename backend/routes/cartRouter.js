const express = require('express')
const router = express.Router()
const { addToCart, getCart, deleteProductCart, changeQuantity, getTotal, getCartQty } = require('../controllers/cartController')
const verifyAuth = require('../middleware/verifyAuth')

router.use(verifyAuth)

router.post('/add/:id', addToCart)

router.get('/get', getCart)

router.post('/delete/:id', deleteProductCart)

router.post('/change-qty', changeQuantity)

router.get('/get-total', getTotal)

router.get('/get-count', getCartQty)



module.exports = router