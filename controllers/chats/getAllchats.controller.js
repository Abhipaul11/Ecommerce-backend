const Conversation = require("../../models/query.models")

const getAllchats = async (req, res) => {
    try {
        const getAllchats = await Conversation.find().populate("members", "_id name email")
        if (!getAllchats) {
            return res.status(400).json({ msg: "Chats not avaliable" })
        }
        return res.status(200).json({ msg: "there is your chats:", getAllchats })
    } catch (error) {
        console.log("catch err", error)
    }
}

module.exports = getAllchats;
