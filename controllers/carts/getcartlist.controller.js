const Cart = require("../../models/cart.models")

const getcartlist = async (req, res) => {
    try {
        const getcartitems = await Cart.find({ userId: req.user._id }).populate({
            path: "productId",
            populate: {
                path: 'category',
                model: 'Category'
            },
        });

        if (!getcartitems) {
            return res.status(401).json({ msg: "You have no items in cart" });
        }
        return res.status(200).json({ success: true, msg: "Thera are your items in cart", getcartitems })
    } catch (error) {
        console.log("catch err", error)
    }
}

module.exports = getcartlist;