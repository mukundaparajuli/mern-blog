const { Router } = require("express");
const { verifyEmail } = require("../controllers/verify-email.controller");

const router = Router();

router.get('/verify-email', verifyEmail);

module.exports = router;