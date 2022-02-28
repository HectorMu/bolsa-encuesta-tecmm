const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/template.controller");

router.get("/getall", verifyToken, controller.GetAll);
router.get("/getone/:id", verifyToken, controller.GetOne);
router.post("/save", verifyToken, controller.Save);
router.delete("/delete/:id", verifyToken, controller.Delete);
router.put("/update/:id", verifyToken, controller.Update);

module.exports = router;
