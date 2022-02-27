const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/graduated.profile.controller");

router.get("/profile/graduated/getall", controller.GetAll);
router.get("/profile/graduated/getone/:id", controller.GetOne);
router.post("/profile/graduated/save", controller.Save);
router.delete("/profile/graduated/delete/:id", controller.Delete);
router.put("/profile/graduated/update/:id", controller.Update);

module.exports = router;
