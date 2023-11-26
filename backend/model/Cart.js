
const { mongoose } = require("mongoose")

const ownerCartSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, },
    qty: { default: 0, type: Number },
    size:{type:String}
})

const cartSchema  =new mongoose.Schema({
    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    ownerCart: [ownerCartSchema]

})
    
module.exports = mongoose.model('cart',cartSchema)