const { mongoose, Schema } = require("mongoose")

const review = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    message: {
        type: String
    },
    rating: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Review", review)