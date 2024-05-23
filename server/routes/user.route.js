const express = require("express");
const { updateProfile } = require("../controllers/user.controller");
const router = express.Router();

router.put('/updateprofile/:id', updateProfile);

module.exports = router;