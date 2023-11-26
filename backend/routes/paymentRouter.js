const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const Razorpay = require('razorpay')

const axios = require('axios');
const Payment = require('../model/Payment');
const Cart = require('../model/Cart');

const {orderSuccess} = require('../controllers/userController')


router.post("/order", (req, res) => {


    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });
    
    try {
    const amount = parseInt(req.body.amount)
    const options = {
      amount: amount * 100, // amount == Rs 10
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 0,
     // 1 for automatic capture // 0 for manual capture
    };
  instance.orders.create(options, async function (err, order) {
    if (err) {
      return res.status(500).json({
        message: "Something Went Wrong internal errror",
      });
      }
     console.log(order);
    return res.status(200).json(order);
   });
} catch (err) {
  return res.status(500).json({
    message: "Something Went Wrong",
  });
     }
});


// router.post("/capture/:paymentId", (req, res) => {
//     console.log(req.params);
//   try {
   
   
     
//   } catch (err) {
//     return res.status(500).json({
//       message: "Something Went Wrong",
//    });
//   }
// });

router.post("/capture/:paymentId", async (req, res) => {
    try {
        const amount = parseInt(req.body.amount)
    const response = await axios.post(
      `https://api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
      {
        amount:  amount * 100, // amount == Rs 10 // Same As Order amount
        currency: "INR",
      },
      {
        auth: {
          username: process.env.KEY_ID,
          password: process.env.KEY_SECRET,
        },
      }
    );

    console.log("Status:", response.status);
    console.log("Headers:", response.headers);
    console.log("Response:", response.data);
      
 
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});


router.post("/order-success", orderSuccess );

module.exports = router