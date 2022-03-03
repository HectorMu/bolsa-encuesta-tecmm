const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/graduated.controller");

router.post("/users/graduated/save", controller.Save);
router.get("/users/graduated/getall", controller.GetAll);
router.get("/users/graduated/getone/:id", controller.GetOne);
router.put("/users/graduated/update/:id", controller.Update);
router.delete("/users/graduated/delete/:id", controller.Delete);

module.exports = router;
