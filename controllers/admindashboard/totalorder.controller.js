const Order = require("../../models/order.models")

const getAllorders = async (req, res) => {
    try {
        const allorders = await Order.find()
        let pending = [];
        let processing = [];
        let shipped = [];
        let transit = [];
        let delivered = [];
        let cancelled = [];

        allorders.map((item) => {
            // console.log("this is items:", item.status)
            if (item.status === "pending") pending.push(item)
            else if (item.status === "processing") processing.push(item)
            else if (item.status === "shipped") shipped.push(item)
            else if (item.status === "transit") transit.push(item);
            else if (item.status === "delivered") delivered.push(item)
            else if (item.status === "cancelled") cancelled.push(item)
        })

        console.log(`All orders are:\n ${allorders} and Total orders: ${allorders.length}`)

        if (!allorders) {
            return res.status(401).json({ msg: "no orders in collection" })
        }

        // return res.status(200).json({ msg: "Your all orders", count: allorders[0].totalOrders })

        return res.status(200).json({ msg: "Your all orders:", pending: pending.length, processing: processing.length, shipped: shipped.length, transit: transit.length, delivered: delivered.length, cancelled: cancelled.length, totalorders: allorders.length })

    } catch (error) {
        console.log("catche error", error)
    }
}

module.exports = getAllorders;