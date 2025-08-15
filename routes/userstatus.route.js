const express = require("express");
const router = express.Router();
const app = express()

const changeStatus = require("../controllers/customerstatus/changestatus.controller")
const { auth } = require("../middlewares/auth.middleware")

router.put("/statuschange", auth, changeStatus)

module.exports = router;
