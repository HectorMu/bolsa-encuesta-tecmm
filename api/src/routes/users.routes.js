const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const validations = require("../middlewares/validations/users.validations");

const controller = require("../controllers/users.controller");

//Endpoints basicos
router.get("/users/getall", verifyToken, controller.GetAll);
router.get("/users/getone/:id", verifyToken, controller.GetOne);
router.post("/users/save", verifyToken, validations, controller.Save);
router.delete("/users/delete/:id", verifyToken, validations, controller.Delete);
router.put("/users/update/:id", verifyToken, controller.Update);

module.exports = router;
