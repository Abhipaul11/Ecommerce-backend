const User = require("../../models/userSchema.models")

const getUserStatus = async (req, res) => {
    try {
        const allUser = await User.find()
        let active = []
        let inActive = []

        console.log(`totaluser:\n ${allUser}`)

        allUser.map((item) => {
            if (item.status === 'active') active.push(item)
            else if (item.status === 'inActive') inActive.push(item)
        })

        if (!allUser) {
            return res.status(401).json({ msg: "User not found" })
        }
        return res.status(200).json({ msg: "Users status:", totaluser: allUser.length, activeuser: active.length, inActiveUser: inActive.length })

    } catch (error) {
        console.log("catch err", error)
    }
}

module.exports = getUserStatus;