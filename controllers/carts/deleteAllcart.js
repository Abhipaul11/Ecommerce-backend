const Cart = require("../../models/cart.models");

const deleteAllcart = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await Cart.deleteMany({ userId });
        res.status(200).json({ msg: "All items deleted from cart", result });

    } catch (error) {
        console.log("catch error", error);
    }
};

module.exports = deleteAllcart;
