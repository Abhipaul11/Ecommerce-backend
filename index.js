const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./config/db.config");
const dotenv = require("dotenv");
dotenv.config();

const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use("/uploads", express.static("uploads"))

app.use(cors({ origin: "*" }))  //will accept request from any client
app.use(express.json())

const authrouter = require("./routes/authRoute.routes")
const productrouter = require("./routes/product.routes")
const addorderrouter = require("./routes/addOrder.route")
const cartrouter = require("./routes/cartitem.route")
const reviewAndquery_router = require("./routes/review_query.routes")
const orderhistoryrouter = require("./routes/orderhistory.routes")
const statusChangerouter = require("./routes/userstatus.route")
const wishlistrouter = require("./routes/wishlist.route")

app.get("/", (req, res) => {
    console.log("ecommerce testing");
    return res.json({
        msg: "server running"
    });
})

dbConnect()

app.use('/api/v1', authrouter, productrouter, addorderrouter, cartrouter)
app.use('/api/v1', reviewAndquery_router, orderhistoryrouter)
app.use('/api/v1', statusChangerouter, wishlistrouter)

app.listen(3000, (req, res) => {
    console.log("ecommerce backend done");
    console.log("server listen at : http://localhost:3000")
});