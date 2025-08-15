const express = require("express");
const router = express.Router();
const app = express()

const signup = require("../controllers/users/signup.controllers");
const login = require("../controllers/users/login.controller");
const deleteUser = require("../controllers/users/delete.controllers");
const updateUser = require("../controllers/users/update.controller")
const getUserStatus = require("../controllers/admindashboard/userstatus.controller")

router.post("/signup", signup)
router.post("/login", login)
router.delete("/delete/:id", deleteUser)
router.put("/updateuser/:id", updateUser)

router.get("/getUserStatus", getUserStatus)

module.exports = router;
