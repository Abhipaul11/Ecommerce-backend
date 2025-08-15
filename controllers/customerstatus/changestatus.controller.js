const User = require("../../models/userSchema.models")

const changeStatus = async (req, res) => {
    try {
        const { id } = req.body;
        const statusChange = await User.findById(id)
        if (statusChange.status === "inActive") statusChange.status = "active"
        else if (statusChange.status === "active") statusChange.status = "inActive"

        await statusChange.save()
        return res.status(200).json({ msg: "Your users", userStatus: statusChange.status })

    } catch (error) {
        console.log('catch err', error)
    }
}

module.exports = changeStatus;