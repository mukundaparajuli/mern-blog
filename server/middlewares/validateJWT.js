const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateJWT = expressAsyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const token = authHeader && authHeader.startsWith("Bearer")
        ? authHeader.split(" ")[1]
        : req.cookies?.Token;

    if (!token) {
        console.error("No token provided");
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded.user; // Attach user information to the request object
        console.log("Token validated successfully");
        next();
    } catch (err) {
        console.error("Invalid token", err.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
});

module.exports = { validateJWT };
