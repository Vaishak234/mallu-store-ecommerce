const express = require('express')
const { addProduct, getProducts, getProduct, getProductsWithType } = require('../controllers/productController')
const { upload } = require('../middleware/multer')
const router = express.Router()


router.post('/addproduct', upload.array('files', 10), addProduct)

router.get('/get-all', getProducts)

router.get('/get-product/:id', getProduct)

router.get('/get-type/:id', getProductsWithType )



module.exports = router 