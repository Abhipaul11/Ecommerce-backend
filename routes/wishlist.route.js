const express = require("express");
const router = express.Router();
const app = express()

const addWishlist = require("../controllers/wishlist/addWishlist.controller")
const getWishlist = require("../controllers/wishlist/getWishlist.controller")
const deleteWishlist = require("../controllers/wishlist/deleteWishlist.controller")
const { auth } = require("../middlewares/auth.middleware")


router.post("/addwishlist/:productId", auth, addWishlist)
router.get("/getwishlist", auth, getWishlist)
router.delete("/deletewishlist/:productId", auth, deleteWishlist)

module.exports = router;
