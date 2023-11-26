const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        reqired:true
    },
    description: {
        type: String,
        reqired:true
    },
    price: {
        type: Number,
        reqired:true
    },
    offPrice: {
        type: Number,
        reqired:true
    },
    offPercent: {
        type: Number,
        reqired: true,
        
    },
    category: {
        type: String,
        reqired: true,
        
    },
    type: {
        type: String,
        reqired: true,
        
    },
    size: {
        type: Array,
        default:[],
        reqired: true,
        
    },
    images: {
        type: Array,
        default:[],        
    },

    
})
module.exports = mongoose.model('products',ProductSchema) 