const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/company.controller");

router.post("/users/company/save", verifyToken, controller.Save);

module.exports = router;
