const asyncHandler = require('express-async-handler')
const Address = require('../model/Address')
const Cart = require('../model/Cart')
const { default: mongoose } = require('mongoose')
const Payment = require('../model/Payment')


const addAddress = asyncHandler(async (req, res) => {

    const user = req.session.user
    
    const {firstname,lastname,email,mobile,address,city,pincode,district,state} = req.body
    if (!firstname || !lastname || !mobile || !email || !city || !pincode || !district || !state) {
        return res.status(400).json('all fields are required')
    }

    const addressExist = await Address.findOne({ user: user._id })
    
    if (!addressExist) {
        await Address.create({
            firstname,lastname,email,mobile,pincode,address,city,district,state,user:user._id
        })
        return res.status(200).json('Address created')
    }
    

})
const editAddress = asyncHandler(async (req, res) => {

    const user = req.session.user
    console.log(req.body);
    
    const {firstname,lastname,email,mobile,address,city,pincode,district,state} = req.body
    if (!firstname || !lastname || !mobile || !email || !city || !pincode || !district || !state) {
        return res.status(400).json('all fields are required')
    }

    const updateAddress = await Address.updateOne({ user: user._id } ,{
            firstname,lastname,email,mobile,pincode,address,city,district,state,user:user._id
        })
    if (!updateAddress) {
        return res.status(400).json('cant update address')
    }
        return res.status(200).json('Address updated')

})


const getAddress = asyncHandler(async (req, res) => {

    const user = req.session.user
    const address = await Address.findOne({ user: user._id })

    return res.status(200).json(address)

})

const getOrders = asyncHandler(async (req, res) => {
      const user = req.session.user
    const userId = new mongoose.Types.ObjectId(user._id)
        
    const orders = await Payment.aggregate([
        { $match: { user: userId } },
        {
            $project: {
                orders: 1,
                delevered:1,
                _id:1
            }
        },
        {
            $unwind:'$orders'
        },
        {
               $lookup: {
                  from: 'products',
                  localField: "orders.item",
                  foreignField: "_id",
                  as: "orderProducts"
               }
        },
        {
            $unwind:'$orderProducts'
        },
        {
            $project: {
                item: '$orders.item',
                qty: '$orders.qty',
                size: '$orders.size',
                title: "$orderProducts.title",
                price: "$orderProducts.price",
                images: "$orderProducts.images",
                delevered: 1,
                _id:1
            }
        },
        
      ])
       
     
      console.log(orders);
      return res.status(200).json(orders)
})

const orderSuccess = asyncHandler(async (req, res) => {
      const user = req.session.user
      const userId = new mongoose.Types.ObjectId(user._id)
        
        const cart = await Cart.findOne({ owner: userId })
       
      const orderSuccess = await Payment.create({
          user: user._id,
          amount: req.body.amount,
          status: req.body.status,
          orders:cart.ownerCart
      })
     await Cart.deleteOne({owner:userId})
        
      console.log(orderSuccess);
    return res.status(200).json('ordered successfully')
})

const removeOrder = asyncHandler(async (req, res) => { 
     
    const user = req.session.user
    const orderId = req.params.id

    const deleteProduct = await Payment.deleteOne({ user: user._id, _id:orderId })

    if (!deleteProduct) return res.status(400).json('cant remove this order')
    
    return res.status(200).json('order removed')

})





module.exports = {
    addAddress,
    getAddress,
    editAddress,
    orderSuccess,
    getOrders,
    removeOrder
}