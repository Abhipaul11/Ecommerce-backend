const Order = require("../../models/order.models");

const cancelorder = async (req, res) => {
    try {
        // const { id } = req.params;
        // const { status } = req.body;
        const { orderno } = req.params;
        const userId = req.user._id;
        // const orderStatus = await Order.findById(id);
        const orderStatus = await Order.findOne({ orderno });

        if (orderStatus.status == "delivered" || orderStatus.status == "cancelled") {
            return res.status(200).json({ msg: "Status cant be changed already closed" });
        }

        await Order.updateMany(
            { orderno },
            { status: "cancelled", cancelledBy: userId },
            { new: true }
        );

        return res.status(200).json({ success: true, msg: "Order cancelled" })

    } catch (error) {
        console.error("Error cancelling order:", error);
        return res.status(500).json({ msg: "An error occurred.", error });
    }
};

module.exports = cancelorder;
