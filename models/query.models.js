const { mongoose, Schema } = require("mongoose")

const query = new mongoose.Schema({
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]

}, { timestamps: true })
module.exports = mongoose.model("Conversation", query)