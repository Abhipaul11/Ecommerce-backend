

const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("Connected to MongoDB Atlas"))
        .catch((err) => {
            console.error("Error while connecting to MongoDB:", err);
            process.exit(1);
        });
};

module.exports = dbConnect;
