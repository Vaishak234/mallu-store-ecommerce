const asyncHandler = require('express-async-handler')
const Cart = require('../model/Cart')
const {mongoose } = require('mongoose')


const addToCart = asyncHandler(async (req, res) => {
   
    const user = req.session.user
    const productId = req.params.id
    const size = req.body.size
    const quantity = 1
    
    if (!productId || !size) {
        return res.status(500).json('error in adding to cart')
    }

    const cartExist = await Cart.findOne({ owner: user._id })
    
    if (cartExist) {
          let productExist = cartExist.ownerCart.findIndex(product => {
               return (
                  product.item == productId && product.size === size
               )
          })
        console.log(productExist);
        if (productExist != -1) {
                
              const updateCart = await Cart.updateOne({ owner: user._id , 'ownerCart.item': productId, 'ownerCart.size': size },
                  { $inc: { 'ownerCart.$.qty': 1 }}
               )
              if(!updateCart)  return res.status(500).json('error in updating to cart')
              return res.status(200).json('product updated in the cart')
            
            } else {

                const updateCart = await Cart.updateOne({ owner: user._id },
                  { $push:{ownerCart:{item:productId,size:size,qty:quantity}}}
            )
              if(!updateCart)  return res.status(500).json('error in updating to cart')
                return res.status(200).json('cart updated')
            }
       
    } else {
         await Cart.create({
            owner: user._id,
             ownerCart: [{
                 item: productId,
                 size:size,
                qty:quantity
            }]
         })
        
        return res.status(200).json('product added to cart')
    }
   
})


const getCart = asyncHandler(async (req, res) => { 
    

    const user = req.session.user
    const userId = new mongoose.Types.ObjectId(user._id)


        let cart = await Cart.aggregate([
            {
               $match: { owner: userId}
            },
            {
               $unwind: '$ownerCart'
            },
            {
               $project: {
                  item: "$ownerCart.item",
                  qty: "$ownerCart.qty",
                  size: "$ownerCart.size"
               }
            },
            {
               $lookup: {
                  from: 'products',
                  localField: "item",
                  foreignField: "_id",
                  as: "cartProducts"
               }
            },
            {
               $unwind: '$cartProducts'
            },
            {
               $project: {
                  item: 1,
                  qty: 1,
                  size: 1,
                  title: "$cartProducts.title",
                    price: "$cartProducts.price",
                   images:"$cartProducts.images"
               }
            },
            
            ])
            return res.status(200).json(cart)

       
})
   
const deleteProductCart = asyncHandler(async (req, res) => { 
     
    const user = req.session.user
    const productId = req.params.id
    const size = req.body.size

    const deleteProduct = await Cart.updateOne({ owner: user._id, 'ownerCart.item': productId, 'ownerCart.size': size }, {
          $pull: { ownerCart: { item: productId, size: size } }
    })
    if (!deleteProduct) return res.status(400).json('cant delete product from cart')
    
    return res.status(200).json('product deleted from cart')

})


const changeQuantity = asyncHandler(async (req, res) => {


    let count = parseInt(req.body.count)
    let quantity = parseInt(req.body.quantity)

        if (quantity == 1 && count == -1) {
            await Cart.updateOne({ _id: req.body.cartId }, {
                $pull: { ownerCart: { item: req.body.productId, size: req.body.size } }
            })
              return res.status(200).json('product removed')

        } else {
             await Cart.updateOne({ _id: req.body.cartId, 'ownerCart.item':req.body.productId, 'ownerCart.size': req.body.size }, {
                $inc: { 'ownerCart.$.qty': count }
            })
            return res.status(200).json('quantity changed')

        }
})

const getCartQty = asyncHandler(async (req, res) => { 
    const user = req.session.user
    const userId = new mongoose.Types.ObjectId(user._id)
    
    const cart = await Cart.findOne({ owner: user._id })
    const qty = cart.ownerCart.length
     console.log(qty);
    res.status(200).json(qty)

})

const getTotal = asyncHandler(async (req,res) => {
    
       const user = req.session.user
       const userId = new mongoose.Types.ObjectId(user._id)

    let cartTotal = await Cart.aggregate([
        {
            $match: { owner: userId }
        },
        {
            $unwind: '$ownerCart'
        },
        {
            $project: {
                item: "$ownerCart.item",
                qty: "$ownerCart.qty",
                size: "$ownerCart.size",
            }
        },
        {
            $lookup: {
                from: 'products',
                localField: "item",
                foreignField: "_id",
                as: "cartProducts"
            }
        }, {
            $project: {
                item: 1,
                qty: 1,
                size: 1,
                product: { $arrayElemAt: ["$cartProducts", 0] }
            }
        },
        {
            $group: {
                _id: null,
                qty: { $sum: '$qty' },
                order: { $sum: { $multiply: ['$qty', '$product.price'] } },
                total: { $sum: { $multiply: ['$qty', '$product.offPrice'] } }
            }
        }
            
    ])
    return res.status(200).json(cartTotal)

   })
   

module.exports = {
      addToCart,
      getCart,
    deleteProductCart,
    changeQuantity,
    getTotal,
    getCartQty
 
}