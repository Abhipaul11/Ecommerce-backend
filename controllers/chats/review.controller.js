const Review = require("../../models/review.models")

const review = async (req, res) => {
    try {
        const { rating, message } = req.body;
        const { productId } = req.params;
        const review = await Review.create({ userId: req.user._id, productId, rating, message })
        if (!review) {
            return res.status(400).json({ msg: "Please give rating" })
        }
        return res.status(201).json({ msg: "Your rating is done", review })
    } catch (error) {
        console.log('catch err', error)
    }
}

const updatereview = async (req, res) => {
    try {
        const { rating, message } = req.body;
        const { id } = req.params;
        const review = await Review.findByIdAndUpdate(
            id,
            { userId: req.user._id, rating, message },
            { new: true }
        )
        if (!review) {
            return res.status(400).json({ msg: "Null message" })
        }
        return res.status(201).json({ msg: "Your rating is done", review })
    } catch (error) {
        console.log('catch err', error)
    }
}

const deletereview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id)
        if (!review) {
            return res.status(400).json({ msg: "failed to delete" })
        }
        return res.status(201).json({ msg: "deleted successfully", review })
    } catch (error) {
        console.log('catch err', error)
    }
}

module.exports = { review, updatereview, deletereview };