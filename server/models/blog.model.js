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
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGgSdPbBMWFzoXcvPhN--IaNlIPWd4heH3NQ&s"
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