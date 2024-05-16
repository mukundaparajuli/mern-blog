const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
    commentText: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);