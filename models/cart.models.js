const { mongoose, Schema } = require("mongoose")

const cart = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Cart", cart)