const jwt = require('jsonwebtoken');

const generateVerificationToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
};

module.exports = { generateVerificationToken }