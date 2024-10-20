const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const verifyEmail = async (req, res) => {
    const { token } = req.query;

    console.log("token= ", token);
    if (!token) {
        return res.status(400).json({ message: 'Invalid or missing token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        console.log("DECODED :", decoded);
        // Find the user and mark their account as verified
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User already verified' });
        }

        user.isVerified = true;
        await user.save();

        // After successful verification, redirect the user to the homepage
        return res.redirect('/');
    } catch (err) {
        return res.status(400).json({ message: 'Token is invalid or has expired' });
    }
};

module.exports = { verifyEmail };
