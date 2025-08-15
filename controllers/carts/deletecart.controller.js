const Cart = require("../../models/cart.models")

const deletecart = async (req, res) => {
    try {
        const { productId } = req.params;

        // const deleteproductcart = await Cart.findOneAndDelete({
        //     productId: req.productId._id
        // })
        const deleteproductcart = await Cart.deleteOne({ productId: productId })

        console.log(deleteproductcart)
        if (!deleteproductcart) {
            res.status(401).json({ msg: "Product not exist" });
        }

        const fullCartlist = await Cart.find({ userId: req.user._id }).populate({
            path: 'productId',
            populate: {
                path: 'category',
                model: 'Category',
            },
        });
        res.status(200).json({ success: true, msg: "Product deleted from cart", fullCartlist });
    } catch (error) {
        console.log("catch error", error)
    }
}

module.exports = deletecart;