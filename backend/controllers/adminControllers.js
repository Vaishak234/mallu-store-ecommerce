const asyncHandler = require('express-async-handler')
const User = require('../model/User')
const Product = require('../model/Product')


const getAllProducts = asyncHandler(async (req, res) => {

    const products = await Product.find()
   
    if (!products) return res.json('cannot fetch products')
    res.status(200).json(products)
})

const getAllUsers = asyncHandler(async (req, res) => {

    const users = await User.find()
   
    if (!users) return res.json('cannot fetch users')
    res.status(200).json(users)
})


module.exports = {
    getAllUsers,
    getAllProducts
 
}