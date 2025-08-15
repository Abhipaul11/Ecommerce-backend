const express = require("express")
const User = require("../../models/userSchema.models")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const signup = async (req, res) => {
    try {
        let { name, email, password, address } = req.body;
        password = bcrypt.hashSync(password, 10)

        const createUser = await User.create({ name, email, password, address });
        const token = jwt.sign({ id: createUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        if (!createUser) {
            res.status(401).json({ msg: "User registered failed", status: false });
        }
        const origin = {
            _id: createUser._id,
            name: createUser.name,
            email: createUser.email,
            token
        };

        res.status(201).json({ msg: "User registered", status: true, origin });

    } catch (error) {
        console.log("failed to create user mderror", error)
    }
}

module.exports = signup

// {"name": "abhi", "email": "abc@gmail.com", "password": "abc123", "address": "kolkata"}   for hopscotch