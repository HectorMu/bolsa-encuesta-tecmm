const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/company.controller");

router.post("/users/company/save", controller.Save);
router.get("/users/company/getall", controller.GetAll);
router.get("/users/company/getone/:id", controller.GetOne);
router.put("/users/company/update/:id", controller.Update);
router.delete("/users/company/delete/:id", controller.Delete);

module.exports = router;
