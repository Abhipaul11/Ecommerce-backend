const express = require("express")
const Category = require("../../models/category.models");

const addCategory = async (req, res) => {
    console.log(req.user)
    try {
        if (req.user.role == "user") {
            return res.status(201).json({ msg: "You are not authorized to add category" })
        }
        const { categoryname } = req.body;

        const category = await Category.create({ categoryname });

        if (!category) {
            return res.status(401).json({ msg: "Category not added" });
        }

        return res.status(201).json({ msg: "category added", category });

    } catch (error) {
        console.log("category failed to add mderor", error)
        res.status(400).json({ msg: error });
    }
};

module.exports = addCategory
