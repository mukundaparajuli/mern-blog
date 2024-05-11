const expressAsyncHandler = require("express-async-handler");

const validateAdmin = expressAsyncHandler(async (req, res, next) => {

    const user = req.body;
    if (user.isAdmin) {
        console.log("Admin Login Successful!");
    } else {
        res.status(401).json({ message: "Not a verified Admin1" });
    }
    next();
});

module.exports = { validateAdmin }