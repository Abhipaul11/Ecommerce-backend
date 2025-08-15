const express = require("express")
const User = require("../../models/userSchema.models")
const bcrypt = require("bcryptjs")

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        let { name, password, address } = req.body;
        // password = bcrypt.hashSync(password, 10);

        if (password) {
            password = bcrypt.hashSync(password, 10);
        }

        const updateuser = await User.findByIdAndUpdate(
            id,
            { name, password, address },
            { new: true }
        )

        if (!updateuser) {
            return res.status(401).json({ msg: "Update query failed", status: false });
        }

        return res.status(201).json({ msg: "Updated successfully", updateuser });

    } catch (error) {
        console.log("failed to delete user mderor", error)
    }
}

module.exports = updateUser;