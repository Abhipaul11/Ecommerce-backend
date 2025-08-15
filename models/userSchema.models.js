const mongoose = require("mongoose")

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
        // required: true
    },
    role: {
        type: String,
        enum: ['super', 'admin', 'user'],
        required: true,
        default: "user"
    },
    status: {
        type: String,
        enum: ['active', 'inActive'],
        default: "active",
        required: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", user)


