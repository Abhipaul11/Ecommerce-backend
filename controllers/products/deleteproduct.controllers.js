const express = require("express")
const Product = require("../../models/productSchema.models")

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(401).json({ msg: "Product not exist", product });
        }
        res.status(200).json({ msg: "Product deleted", product });
    } catch (error) {
        console.log("failed to delete mderor", error)
    }
}

module.exports = deleteProduct