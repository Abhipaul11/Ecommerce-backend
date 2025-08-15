const express = require("express");
const router = express.Router();

const orderhistory = require("../controllers/orders/orderhistory.controller")
const cancelorder = require("../controllers/orders/cancelorder.controller")
const { auth } = require("../middlewares/auth.middleware")

router.get("/orderhistory", auth, orderhistory);
router.put("/cancelorder/:orderno", auth, cancelorder);

module.exports = router;