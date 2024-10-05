const express = require("express");
const { updateProfile, profileInfo } = require("../controllers/user.controller");
const upload = require("../middlewares/multer");
const router = express.Router();

router.put('/updateprofile/:id', upload.single("avatar"), updateProfile);
router.get('/profile', profileInfo);

module.exports = router;