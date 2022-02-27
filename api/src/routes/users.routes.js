const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const validations = require("../middlewares/validations/users.validations");

const controller = require("../controllers/users.controller");

router.get("/users/getall", controller.GetAll);
router.get("/users/getone/:id", controller.GetOne);
router.post("/users/save", validations, controller.Save);
router.delete("/users/delete/:id", validations, controller.Delete);
router.put("/users/update/:id", controller.Update);

module.exports = router;
