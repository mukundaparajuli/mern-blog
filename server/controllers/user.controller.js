const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const updateProfile = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { username, email, imageURL } = req.body;

    try {

        const user = await User.findByIdAndUpdate(
            id,
            { username, email, imageURL },
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