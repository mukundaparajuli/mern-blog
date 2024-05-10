const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const validateJWT = expressAsyncHandler(async (req, res) => {
    let token;
    const authHeader = req.headers.Authentication;
    if (authHeader && authHeader.startsWith(`Bearer`)) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).send("not verified!");
                next();
            }
            req.user = decoded.user;
        })
    }
    next();
});

module.exports = { validateJWT };