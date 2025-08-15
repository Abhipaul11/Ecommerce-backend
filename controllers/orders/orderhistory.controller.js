const { Types } = require("mongoose")
const Order = require("../../models/order.models")

const orderhistory = async (req, res) => {
    try {
        // const userId = req.user._id;
        // const userOrders = await Order.find({ userId }).sort({ createdAt: -1 })
        //     .populate({
        //         path: 'productId',
        //         populate: {
        //             path: 'category',
        //             model: 'Category',
        //         },
        //     })
        //     .populate({
        //         path: 'userId',
        //         select: 'name ',
        //         model: 'User',
        //     })

        const userOrders = await Order.aggregate([
            {
                $match: {
                    userId: new Types.ObjectId(req.user._id)
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $unwind: "$product"
            },
            {
                $addFields: {
                    amount: { $multiply: ["$quantity", "$product.price"] }
                }
            },
            {
                $group: {
                    _id: "$orderno",
                    totalAmount: { $sum: "$amount" },
                    items: {
                        $push: {
                            product: "$product",
                            quantity: "$quantity",
                            amount: "$amount",
                            status: "$status",
                            createdAt: "$createdAt"
                        }
                    },
                    count: { $sum: 1 }
                }
            }
        ])

        // console.log("================ This is pipeline data ==============\n", userOrders)


        if (!userOrders) {
            return res.status(404).json({ msg: "No order-history found" });
        }
        res.status(200).json({ msg: "Your order history:", userOrders })
    } catch (error) {
        console.log("Internal server error", error)
        res.status(400).json({ msg: "error in try" })
    }
}

module.exports = orderhistory;