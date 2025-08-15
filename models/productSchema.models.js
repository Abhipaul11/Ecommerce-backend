const { mongoose, Schema } = require("mongoose");

const product = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Product", product)



