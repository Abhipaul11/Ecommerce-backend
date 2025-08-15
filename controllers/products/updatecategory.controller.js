const express = require("express")
const Category = require("../../models/category.models");

const updatecategory = async (req, res) => {
    try {
        if (req.user.role == "user") {
            return res.status(201).json({ msg: "You are not authorized to add category" })
        }
        const { id } = req.params;
        const { categoryname } = req.body;
        const updatecategory = await Category.findByIdAndUpdate(id, { categoryname }, { new: true })
        if (!updatecategory) {
            return res.status(401).json({ msg: "Failed to Update category" })
        }
        return res.status(201).json({ msg: "Category Updated", updatecategory })
    } catch (error) {
        console.log("internal server err", error)
    }
}

module.exports = updatecategory;