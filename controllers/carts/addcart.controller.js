const Cart = require("../../models/cart.models");
const mongoose = require("mongoose")

const addcart = async (req, res) => {
    try {
        const { productId } = req.params;

        const matchedItem = await Cart.aggregate([{
            $match: {
                productId: new mongoose.Types.ObjectId(productId),
                userId: new mongoose.Types.ObjectId(req.user._id)
            }
        }])
        // console.log(matchedItem)
        // return
        if (matchedItem.length > 0) return res.status(200).json({ success: false, msg: "item already in cart" })

        const cartitem = await Cart.create({ userId: req.user._id, productId })
        if (!cartitem) {
            return res.status(400).json({ msg: "please add cart" })
        }
        const allCartitem = await Cart.find({ userId: req.user._id }).populate({
            path: "productId",
            populate: {
                path: 'category',
                model: 'Category'
            }
        })
        return res.status(200).json({ success: true, msg: "item added to cart", allCartitem })
    } catch (error) {
        console.log("catch err", error)
    }
}

module.exports = addcart;