// const Product = require("../../models/productSchema.models");

// const getAllproduct = async (req, res) => {
//     try {
//         const { size } = req.query;
//         const limit = size ? Number(size) : 100;

//         const getproducts = await Product.find()
//             .sort({ createdAt: 1 })
//             .populate("category")
//             .limit(limit);

//         if (!getproducts || getproducts.length === 0) {
//             return res.status(404).json({ msg: "No products in collection" });
//         }

//         return res.status(200).json({ msg: "Here are your items", products: getproducts });
//     } catch (error) {
//         console.log("catch err", error);
//         return res.status(500).json({ msg: "Server error", error: error.message });
//     }
// };

// module.exports = getAllproduct;



const Product = require("../../models/productSchema.models")
const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT

const getAllproduct = async (req, res) => {
    try {
        const { size } = req.query;

        const limit = size ? Number(size) : 100;

        // if (size) query.size = Number(size)


        const getproducts = await Product.find().sort({ createdAt: 1 }).populate("category").limit(limit)
        if (!getproducts) {
            return res.status(401).json({ msg: "no products in collection" })
        }

        const allProducts = getproducts.map((product) => {

            return {
                ...product.toObject(), image: `${SERVER_ENDPOINT}uploads/${product.image}`
            }
        })

        return res.status(200).json({ msg: "There are your items", allProducts })
    } catch (error) {
        console.log("catch err", error)
    }
}

module.exports = getAllproduct;