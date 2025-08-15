const express = require("express");
const router = express.Router();

const addcart = require("../controllers/carts/addcart.controller")
const getcartlist = require("../controllers/carts/getcartlist.controller")
const deletecart = require("../controllers/carts/deletecart.controller")
const deleteAllcart = require("../controllers/carts/deleteAllcart")
const { quantityIncrease, quantityDecrease } = require("../controllers/carts/quantityUpdate.controller")

const { auth } = require("../middlewares/auth.middleware")

router.post("/addcart/:productId", auth, addcart)
router.get("/getcartlist", auth, getcartlist)
router.delete("/deletecart/:productId", auth, deletecart)
router.delete("/deleteallcart/:userId", auth, deleteAllcart)
router.put("/quantityincrease/:productId", auth, quantityIncrease);
router.put("/quantitydecrease/:productId", auth, quantityDecrease);
module.exports = router;