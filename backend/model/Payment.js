
const { mongoose } = require("mongoose")



const PaymentSchema  =new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    amount: {
        type: Number,
        required:true
    },
    status: {
        type: String,
        default:'pending'
    },
    orders: {
        type:Array
    },
    delevered: {
        type: Boolean,
        default:false
    }

})
    
module.exports = mongoose.model('payment',PaymentSchema)