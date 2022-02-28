const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/graduated.profile.controller");

router.get("/profile/graduated/getall", verifyToken, controller.GetAll);
router.get("/profile/graduated/getone/:id", verifyToken, controller.GetOne);
router.post("/profile/graduated/save", verifyToken, controller.Save);
router.delete("/profile/graduated/delete/:id", verifyToken, controller.Delete);
router.put("/profile/graduated/update/:id", verifyToken, controller.Update);

module.exports = router;
