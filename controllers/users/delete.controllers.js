const express = require("express")
const User = require("../../models/userSchema.models")

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(401).json({ msg: "User not exist", status: false });
        }
        res.status(200).json({ msg: "User deleted", user, status: true });
    } catch (error) {
        console.log("failed to delete user mderor", error)
    }
}

module.exports = deleteUser