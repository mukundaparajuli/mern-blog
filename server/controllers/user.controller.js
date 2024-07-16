const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const { uploadToCloudinary } = require("../config/cloudinary");

const updateProfile = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    const avatar = req.file;
    const avatarPath = avatar?.path;

    console.log("File:", avatar);
    console.log("Body:", req.body);

    let avatarUrl;

    if (avatarPath) {
        try {
            const cloudinaryUrlAvatar = await uploadToCloudinary(avatarPath);
            avatarUrl = cloudinaryUrlAvatar.url;
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            return res.status(500).json({ message: "Error uploading image to Cloudinary" });
        }
    } else {
        avatarUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    }

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { username, email, imageURL: avatarUrl },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = { updateProfile };