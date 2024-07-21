const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logOutUser, refreshToken } = require("../controllers/auth.controller")
const { validateJWT } = require("../middlewares/validateJWT")

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', validateJWT, logOutUser);
router.post('/refresh-token', refreshToken)

module.exports = router;