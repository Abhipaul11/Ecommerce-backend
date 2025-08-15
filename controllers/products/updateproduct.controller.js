const express = require("express")
const Product = require("../../models/productSchema.models")
const fs = require("fs")
const path = require("path")
let uploads = path.join(process.cwd(), "/uploads/")

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price } = req.body;
        const allproducts = await Product.findById(id)

        let filename;
        if (req?.files?.file1) {
            var startup_image = req.files.file1;
            filename = startup_image.name;
            fs.unlinkSync(`${uploads}${allproducts.image}`)
            console.log('file deleted successfully')

            startup_image.mv(uploads + filename, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("uploaded", uploads);
                }
            });
        }

        const updateproduct = await Product.findByIdAndUpdate(
            id,
            { name, category, price, image: filename },
            { new: true }
        )
        if (!updateproduct) {
            return res.status(400).json({ msg: "Failed to update" })
        }
        return res.status(200).json({ msg: "Update successfully", updateproduct })

    } catch (error) {
        console.log("catch error", error)
    }
}

module.exports = updateProduct;