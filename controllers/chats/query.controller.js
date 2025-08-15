const Conversation = require("../../models/query.models")
const Chat = require("../../models/chat.model");
const User = require("../../models/userSchema.models");

const query = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { comment } = req.body

        const existing = await Conversation.findOne({ members: { $in: [userId] } })
        if (existing) {
            const myComment = await Chat.create({ conversationId: existing._id, senderId: userId, message: comment })

            if (myComment) {
                return res.status(201).json({ msg: "Message Sent" })

            } return res.status(500).json({ msg: "Failed to send message" })
        }
        const myAdmin = await User.findOne({ role: "admin" });
        const newConversation = await Conversation.create({ members: [userId, myAdmin._id] })

        const myComment = await Chat.create({ conversationId: newConversation._id, senderId: userId, message: comment })

        if (myComment) {
            return res.status(201).json({ msg: "Message Sent" })
        }
        return res.status(500).json({ msg: "Failed to send message" })

    } catch (error) {
        console.log("catch err", error)
    }
}

const updatequery = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body
        const query = await Conversation.findByIdAndUpdate(id, { userId: req.user._id, message: comment }, { new: true })

        if (!query) {
            return res.status(400).json({ msg: "Please enter your query" })
        }
        return res.status(400).json({ msg: "your query updated", query })

    } catch (error) {
        console.log("catch err", error)
    }
}

const deletequery = async (req, res) => {
    try {
        const { id } = req.params;
        const query = await Conversation.findByIdAndDelete(id)
        if (!query) {
            return res.status(400).json({ msg: "Please enter your query" })
        }
        return res.status(400).json({ msg: "Conversation deleted succesfully", query })

    } catch (error) {
        console.log("catch err", error)
    }
}

module.exports = { query, updatequery, deletequery }