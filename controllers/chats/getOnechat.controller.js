const Conversation = require("../../models/query.models")
const Chat = require("../../models/chat.model");

const getOnechat = async (req, res) => {
    try {
        const { conversationId } = req.params
        const getOnechat = await Chat.find({ conversationId })
        if (!getOnechat) return res.status(400).json({ msg: "chat is not avaliable" })

        return res.status(200).json({ msg: "there is your chat", getOnechat })
    } catch (error) {
        console.log('catch err', error)
    }
}
module.exports = getOnechat;