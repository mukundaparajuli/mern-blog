const express = require("express");
const { validateAdmin } = require("../middlewares/validateAdmin");
const { getUsers } = require("../controllers/admin.controller");
const router = express.Router();

router.get("/users", validateAdmin, getUsers);

module.exports = router;