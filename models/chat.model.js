const { mongoose, Schema } = require("mongoose")

const chat = new mongoose.Schema({
    conversationId: {
        type: Schema.Types.ObjectId,
        require: true
    },
    senderId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    message: {
        type: String,
        require: true
    }

}, { timestamps: true })

module.exports = mongoose.model("Chat", chat)