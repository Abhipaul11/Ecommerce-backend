const { Schema, mongoose } = require("mongoose")

const wishlist = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Wishlist", wishlist)