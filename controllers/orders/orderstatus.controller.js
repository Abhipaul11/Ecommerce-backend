const Order = require("../../models/order.models");

const orderstatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        let orderStatus = await Order.findById(id)

        const nonReversestatus = {
            pending: 0, processing: 1, shipped: 2, transit: 3, delivered: 4, cancelled: 4
        }

        if (orderStatus.status == "delivered" || orderStatus.status == "cancelled") {
            return res.status(200).json({ msg: "Status cant be changed already closed" })
        }

        console.log("this is user info", req.user)

        if (nonReversestatus[status] > nonReversestatus[orderStatus.status]) {
            await Order.findByIdAndUpdate(id, { status, cancelledBy: req.user.role })
        }

        orderStatus = await Order.findById(id)

        return res.status(200).json({ msg: "your order status is:", orderStatus: orderStatus.status })

    } catch (error) {
        console.log("catch err", error)
    }
}
module.exports = orderstatus;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTAyYTNmZmZmYzJhY2JkMGI1YjZkZCIsImlhdCI6MTczMzk4ODMxNywiZXhwIjoxNzM0MDc0NzE3fQ.BHqOBzbTsag2ZuHPa_EsrgXg1NOzG9Zn0dJ9x_RoKyU                      Admin