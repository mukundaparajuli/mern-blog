const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const { uploadToCloudinary } = require("../config/cloudinary");
const jwt = require("jsonwebtoken")

const updateProfile = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    const avatar = req.file;
    const avatarPath = avatar?.path;

    let avatarUrl;

    if (avatarPath) {
        try {
            const cloudinaryUrlAvatar = await uploadToCloudinary(avatarPath);
            avatarUrl = cloudinaryUrlAvatar.url;
            const user = await User.findByIdAndUpdate(
                id,
                { username, email, imageURL: avatarUrl },
                { new: true, runValidators: true }
            );

            res.json({
                message: "User Updated Successfully!",
                user
            })
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            return res.status(500).json({ message: "Error uploading image to Cloudinary" });
        }
    } else {
        try {
            const user = await User.findByIdAndUpdate(
                id,
                { username, email },
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
    }
});



const profileInfo = expressAsyncHandler(async (req, res) => {

    const { Token } = req.cookies;

    if (!Token) {
        res.status(404).json({ message: "Token not found" });
    }


    jwt.verify(Token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(401).send("Token not verified!");
        } else {
            const userInfo = decoded.user;
            return res.status(200).json({ message: 'user profile', userInfo });

        }
    });
})

module.exports = { updateProfile, profileInfo };



