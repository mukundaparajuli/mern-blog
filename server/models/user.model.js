const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    "username": {
        type: String,
        required: true,
        unique: true,
    },
    "email": {
        type: String,
        required: true,
        unique: true,
    },
    "password": {
        type: String,
        required: true,
    },
    "isAdmin": {
        type: Boolean,
        default: false,
    },
    "imageURL": {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    "savedPosts": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
