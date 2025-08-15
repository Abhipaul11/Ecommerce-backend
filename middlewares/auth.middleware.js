const User = require("../models/userSchema.models")
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
    // console.log(req.headers.authorization)
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ msg: "Token not found in authorization" })
        }
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ msg: "Token not found" })
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET)

        if (!id) {
            return res.status(401).json({ msg: "Invalid token" })
        }

        const finduser = await User.findOne({ _id: id });
        req.user = finduser;
        next()
    } catch (error) {
        return res.status(401).json({ msg: error })

    }
}

module.exports = { auth };