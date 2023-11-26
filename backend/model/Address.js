const { mongoose } = require("mongoose")


const addressSchema = new mongoose.Schema({
    
    firstname: {
        type: String,
        required:true
    },
    lastname: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required:true
    },
    pincode: {
        type: Number,
        required:true
    },
    city: {
        type: String,
        required:true
    },
    district: {
        type: String,
        required:true
    },
    state: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    mobile: {
        type: Number,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }

})
    
module.exports = mongoose.model('address',addressSchema)