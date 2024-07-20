const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logOutUser } = require("../controllers/auth.controller")
const { validateJWT } = require("../middlewares/validateJWT")

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', validateJWT, logOutUser)

module.exports = router;