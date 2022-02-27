const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/template.controller");

router.get("/getall", controller.GetAll);
router.get("/getone/:id", controller.GetOne);
router.post("/save", controller.Save);
router.delete("/delete/:id", controller.Delete);
router.put("/update/:id", controller.Update);

module.exports = router;
