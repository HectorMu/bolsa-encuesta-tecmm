const express = require("express");
const router = express.Router();
const isAdmin = require("../middlewares/isAdmin");
const verifyToken = require("../middlewares/verifyToken");
const validations = require("../middlewares/validations/users.validations");

const controller = require("../controllers/users.controller");

//Endpoints basicos
router.get("/users/getall", verifyToken, controller.GetAll);
router.get("/users/getone/:id", verifyToken, controller.GetOne);
router.post("/users/save", verifyToken, validations, controller.Save);
router.delete("/users/delete/:id", verifyToken, isAdmin, controller.Delete);
router.put("/users/update/:id", verifyToken, validations, controller.Update);

module.exports = router;
