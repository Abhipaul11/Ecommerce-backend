const Cart = require("../../models/cart.models")

const quantityIncrease = async (req, res) => {
    try {
        const { productId } = req.params;
        // const { quantity } = req.body;
        const order = await Cart.findOne({ productId });
        console.log(order)

        if (!order) {
            return res.status(404).json({ msg: "Product not found" });
        }
        order.quantity += 1;
        const updatedorder = await order.save();

        return res.status(200).json({ msg: "Quantity increased", updatedorder });
    } catch (error) {
        console.log("catch error", error)
    }
}

const quantityDecrease = async (req, res) => {
    try {
        const { productId } = req.params;
        const order = await Cart.findOne({ productId });

        if (!order) {
            return res.status(404).json({ msg: "Product not found" });
        }
        if (order.quantity > 1) {
            order.quantity -= 1;
            const updatedorder = await order.save();
            return res.status(200).json({ msg: "Quantity decreased", updatedorder });
        } else {
            return res.status(200).json({ msg: "Quantity should be atleast 1" });
        }


    } catch (error) {
        console.log("catch error", error)
    }
}
module.exports = { quantityIncrease, quantityDecrease };

