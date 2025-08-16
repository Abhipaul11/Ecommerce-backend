



const Order = require("../../models/order.models")
const Cart = require("../../models/cart.models")
const { v4: uuid } = require("uuid")

const addOrder = async (req, res) => {
    try {
        const orders = req.body;
        const orderno = uuid().slice(0, 8);


        const finalOrderList = orders.map((item) => {
            return {
                productId: item.productId._id,
                userId: req.user._id,
                quantity: item.quantity,
                orderno: orderno
            }
        })

        // await Order.collection.dropIndex('orderno_1', (err, result) => {
        //     if (err) {
        //         console.error('Error dropping index:', err);
        //     } else {
        //         console.log('Index dropped:', result);
        //     }
        // });

        const placeOrder = await Order.insertMany(finalOrderList)


        if (!placeOrder) {
            return res.status(400).json({ status: false, msg: "failed: to place order" })
        }
        const result = await Cart.deleteMany({ userId: req.user._id });

        res.status(200).json({ status: true, msg: "order placed!", orderedItems: placeOrder })



    } catch (error) {
        console.log("catch error", error)
    }
}

module.exports = addOrder;