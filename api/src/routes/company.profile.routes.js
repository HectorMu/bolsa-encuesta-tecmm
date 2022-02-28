const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/company.profile.controller");

router.get("/profile/company/getall", verifyToken, controller.GetAll);
router.get("/profile/company/getone/:id", verifyToken, controller.GetOne);
router.post("/profile/company/save", verifyToken, controller.Save);
router.delete("/profile/company/delete/:id", verifyToken, controller.Delete);
router.put("/profile/company/update/:id", verifyToken, controller.Update);

module.exports = router;
