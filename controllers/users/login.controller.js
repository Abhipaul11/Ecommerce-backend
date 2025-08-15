const express = require("express");
const User = require("../../models/userSchema.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;


        const loginUser = await User.findOne({ email });

        const originalpass = bcrypt.compareSync(password, loginUser.password)
        // console.log(loginUser)
        // return
        const token = jwt.sign({ id: loginUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        if (originalpass) {

            const origin = {
                _id: loginUser._id,
                name: loginUser.name,
                email: loginUser.email,
                token
            };
            res.status(201).json({ message: 'login successful', origin, status: false });
        } else {
            res.status(401).json({ message: 'login failed try again' });
        }
    } catch (error) {
        console.log("login failed mderor", error)
    }
}

module.exports = login