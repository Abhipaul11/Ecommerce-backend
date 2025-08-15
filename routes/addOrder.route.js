const express = require("express");
const router = express.Router();

const addOrder = require("../controllers/orders/addorder.controllers")
const { auth } = require("../middlewares/auth.middleware")
const orderstatus = require("../controllers/orders/orderstatus.controller")
const getAllorders = require("../controllers/admindashboard/totalorder.controller")


router.post("/addorder", auth, addOrder)
router.put("/orderstatus/:id", auth, orderstatus)


router.get("/getallorders", auth, getAllorders)


module.exports = router;

