const express = require("express");
const router = express.Router();

const { query, updatequery, deletequery } = require("../controllers/chats/query.controller")
const { review, updatereview, deletereview } = require("../controllers/chats/review.controller")
const getAllchats = require("../controllers/chats/getAllchats.controller")
const getOnechat = require("../controllers/chats/getOnechat.controller")
const deleteConversation = require("../controllers/chats/deleteConversation.controller")

const { auth } = require("../middlewares/auth.middleware")

//query and chats routes
router.post("/query", auth, query)
router.put("/updatequery/:id", auth, updatequery)
router.delete("/deletequery/:id", auth, deletequery)
router.get("/getallchats", auth, getAllchats)
router.get("/getonechat/:conversationId", auth, getOnechat)
router.delete("/deleteconversation/:id", auth, deleteConversation)

//review routes
router.post("/review/:productId", auth, review)
router.put("/updatereview/:id", auth, updatereview)
router.delete("/deletereview/:id", auth, deletereview)

module.exports = router