const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    blogDescription: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        default: "https://bit.ly/blogImg"
    },
    author: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    category: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);