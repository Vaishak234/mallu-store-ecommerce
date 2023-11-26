const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        reqired:true
    },
    email: {
        type: String,
        reqired:true
    },
    password: {
        type: String,
        reqired:true
    },
    mobile: {
        type: Number,
        reqired: true,
        
    }
    
})
module.exports = mongoose.model('users',userSchema)