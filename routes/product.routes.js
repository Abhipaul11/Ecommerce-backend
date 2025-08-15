const express = require("express");
const router = express.Router();

const addProduct = require("../controllers/products/addproduct.controllers");
const deleteProduct = require("../controllers/products/deleteproduct.controllers");
const updateProduct = require("../controllers/products/updateproduct.controller");
const getAllproduct = require("../controllers/products/getallproduct.controller");

const addcategory = require("../controllers/products/addcategory.controllers");
const updatecategory = require("../controllers/products/updatecategory.controller")

const { auth } = require("../middlewares/auth.middleware")

router.get("/getallproduct", getAllproduct)

router.use(auth)

router.post("/addproduct", addProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.put("/updateproduct/:id", updateProduct);

router.post("/addcategory", addcategory);
router.put("/updatecategory/:id", updatecategory)

module.exports = router;