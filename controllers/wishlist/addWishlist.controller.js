const Wishlist = require("../../models/wishlist.model")
const mongoose = require("mongoose")

const addWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        const matchedItem = await Wishlist.aggregate([{
            $match: {
                productId: new mongoose.Types.ObjectId(productId),
                userId: new mongoose.Types.ObjectId(req.user._id)
            }
        }])

        if (matchedItem.length > 0) return res.status(200).json({ success: false, msg: "item already in wishlist" })


        const wishlistitem = await Wishlist.create({ userId: req.user._id, productId })

        if (!wishlistitem) {
            return res.status(400).json({ msg: "Failed to Add Products" })
        }

        const allList = await Wishlist.find({ userId: req.user._id }).populate({
            path: 'productId',
            populate: {
                path: 'category',  // the field in productId you want to populate
                model: 'Category'  // the model you want to use for the category
            }
        })

        return res.status(200).json({ success: true, msg: "item added to wishlist", allList })
    } catch (error) {
        console.log("catch err", error)
    }
}

module.exports = addWishlist;