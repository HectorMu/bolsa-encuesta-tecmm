const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/company.profile.controller");

router.get("/profile/company/getall", controller.GetAll);
router.get("/profile/company/getone/:id", controller.GetOne);
router.post("/profile/company/save", controller.Save);
router.delete("/profile/company/delete/:id", controller.Delete);
router.put("/profile/company/update/:id", controller.Update);

module.exports = router;
