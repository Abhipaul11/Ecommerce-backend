const { mongoose, Schema } = require("mongoose")

const order = new mongoose.Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'transit', 'delivered', 'cancelled'],
        default: "pending"
    },
    cancelledBy: {
        type: String,
        default: ""
    },
    orderno: {
        type: String,
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Order", order)