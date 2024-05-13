const express = require("express");
const { validateJWT } = require("../middlewares/validateJWT");
const { validateAdmin } = require("../middlewares/validateAdmin");
const { getUsers } = require("../controllers/admin.controller");
const router = express.Router();

router.get("/users", validateJWT, validateAdmin, getUsers);

module.exports = router;