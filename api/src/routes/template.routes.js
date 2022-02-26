const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/template.controller");

router.get("/api/getall", verifyToken, controller.GetAll);
router.get("/api/getone/:id", verifyToken, controller.GetOne);
router.post("/api/save", verifyToken, controller.Save);
router.delete("/api/delete/:id", verifyToken, controller.Delete);
router.put("/api/update/:id", verifyToken, controller.Update);

module.exports = router;
