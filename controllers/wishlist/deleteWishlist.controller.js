const Wishlist = require("../../models/wishlist.model")


const deleteWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        const deleteWishlistitem = await Wishlist.deleteOne({ productId: productId })


        const fullWishlist = await Wishlist.find({ userId: req.user._id }).populate({
            path: 'productId',
            populate: {
                path: 'category',
                model: 'Category',
            },
        });
        // console.log(deleteproductcart)
        if (!deleteWishlistitem) {
            res.status(401).json({ msg: "Product not exist" });
        }

        res.status(200).json({ msg: "Product deleted from cart", fullWishlist });
    } catch (error) {
        console.log("catch error", error)
    }
}

module.exports = deleteWishlist;