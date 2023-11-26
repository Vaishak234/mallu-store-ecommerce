const asyncHandler = require('express-async-handler');
const Product = require('../model/Product');


const addProduct = asyncHandler(async (req, res) => {
     
    console.log(req.body);
    console.log(req.files);
    const product = JSON.parse(req.body.product)
   

    const images = req.files.map((file)=>file.filename)
    console.log(images);

     const savePost = await Product.create( {
         title: product.title,
         price: product.price,
         offPrice: product.offPrice,
         offPercent: product.offPercent,
         category: product.category,
         type: product.type,
         size: product.size,
         images
     })
    if(!savePost) return res.status(500).json('error in posting product')
    res.status(200).json('posted product')
})


const getProducts = asyncHandler(async(req,res) => {
    
    const products = await Product.find()
    console.log(products);
    
    if(!products) return res.status(500).json('error in fetching products')
    res.status(200).json(products)
})

const getProductsWithType = asyncHandler(async(req,res) => {

    const products = await Product.find({ type: req.params.id })
     console.log(products);
    if(!products) return res.status(500).json('error in fetching products')
    res.status(200).json(products)
})

const getProduct = asyncHandler(async(req,res) => {
    
    const id = req.params.id
     
    const product = await Product.findOne({ _id: id })
    if (!product) return res.status(400).json('error in fetching product')
    
    res.status(200).json(product)
   
})



module.exports = {
    addProduct,
    getProducts,
    getProduct,
    getProductsWithType
 
}