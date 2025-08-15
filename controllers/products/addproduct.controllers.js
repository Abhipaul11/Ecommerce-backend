const express = require("express");
const Product = require("../../models/productSchema.models");
const Category = require("../../models/category.models");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

let uploads = path.join(process.cwd(), "/uploads/");

const addProduct = async (req, res) => {
    console.log("Incoming request:", req.body);

    try {
        if (!req.user || req.user.role === "user") {
            return res.status(403).json({ msg: "You are not authorized to add product" });
        }

        if (!req.files || !req.files.file1) {
            return res.status(400).json({ msg: "Image file is required" });
        }

        const { name, category, price } = req.body;
        let startup_image = req.files.file1;
        let uploadPath = path.join(uploads, startup_image.name); // KEEP SAME NAME

        console.log("Original file size:", (startup_image.size / 1024).toFixed(2), "KB");

        // Step 1: Compress until under 12 KB
        let quality = 90;
        let buffer = startup_image.data;
        let tries = 0;

        while (buffer.length > 12 * 1024 && quality > 20 && tries < 10) {
            buffer = await sharp(startup_image.data)
                .jpeg({ quality })
                .toBuffer();
            quality -= 5;
            tries++;
        }

        console.log(`Compressed size: ${(buffer.length / 1024).toFixed(2)} KB after ${tries} tries`);

        // Step 2: Save to /uploads with SAME name
        fs.writeFileSync(uploadPath, buffer);

        // Step 3: Create product
        const product = await Product.create({
            name,
            category,
            price,
            image: startup_image.name
        });

        return res.status(201).json({ msg: "Product created", product });

    } catch (error) {
        console.error("Product failed to add", error);
        if (!res.headersSent) {
            return res.status(500).json({ msg: "Server error", error: error.message });
        }
    }
};

module.exports = addProduct;


// const express = require("express")
// const Product = require("../../models/productSchema.models")
// const Category = require("../../models/category.models");

// const path = require("path");
// let uploads = path.join(process.cwd(), "/uploads/")

// const addProduct = async (req, res) => {
//     console.log(req.user)
//     try {
//         if (req.user.role == "user") {
//             return res.status(201).json({ msg: "You are not authorized to add product" })
//         }
//         const { name, category, price } = req.body;

//         var startup_image = req.files.file1;
//         let filename = startup_image.name;

//         startup_image.mv(uploads + filename, function (err) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log("uploaded", uploads);
//             }
//         });

//         const product = await Product.create({ name, category, price, image: filename });

//         if (!product) {
//             res.status(401).json({ msg: "Product not added" });
//         }

//         res.status(201).json({ msg: "Product created", product });

//     } catch (error) {
//         console.log("Product failed to add mderor", error)
//         res.status(400).json({ msg: error });

//     }
// };


// module.exports = addProduct

// // "name" :"oppo", "category":"phone","price":12000  for hopscotch




