const Chat = require("../../models/chat.model");
const Conversation = require("../../models/query.models")

const deleteConversation = async (req, res) => {
    try {
        const { id } = req.params;
        const conversationfind = await Conversation.findById(id);

        if (!conversationfind) {
            return res.status(404).json({ msg: "Conversation not found" });
        }
        const deleteChat = await Chat.deleteMany({ conversationId: id });
        const deleteConversation = await Conversation.findByIdAndDelete(id);

        return res.status(200).json({ msg: "Conversation and chats deleted successfully" });

    } catch (error) {
        console.log("catch err", error)
    }
}
module.exports = deleteConversation;