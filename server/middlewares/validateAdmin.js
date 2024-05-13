const expressAsyncHandler = require("express-async-handler");

const validateAdmin = expressAsyncHandler(async (req, res, next) => {

    const user = await req.user;
    console.log("Users: ", user);
    if (user?.isAdmin) {
        console.log("Admin Login Successful!");
        next();
    } else {
        res.status(401).json({ message: "Not a verified Admin1" });
    }
});

module.exports = { validateAdmin }