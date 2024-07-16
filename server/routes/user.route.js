const express = require("express");
const { updateProfile } = require("../controllers/user.controller");
const upload = require("../middlewares/multer");
const router = express.Router();

router.put('/updateprofile/:id', upload.single("avatar"), updateProfile);

module.exports = router;