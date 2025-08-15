const Wishlist = require("../../models/wishlist.model")

const getWishlist = async (req, res) => {
    try {
        const fullWishlist = await Wishlist.find({ userId: req.user._id }).populate({
            path: 'productId',
            populate: {
                path: 'category',
                model: 'Category',
            },
        });

        if (!fullWishlist.length) {
            return res.status(404).json({ msg: "Your wishlist is empty" });
        }

        return res.status(200).json({ msg: "Your wishlist items", fullWishlist });
    } catch (error) {
        console.log("catch err", error)
    }
}

module.exports = getWishlist;