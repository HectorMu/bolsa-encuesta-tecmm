const express = require("express");
const router = express.Router();
const isAdmin = require("../middlewares/isAdmin");
const verifyToken = require("../middlewares/verifyToken");
const validations = require("../middlewares/validations/admin.users.validations");

const controller = require("../controllers/admin.users.controller");

//Endpoints basicos
router.get("/users/getall", verifyToken, isAdmin, controller.GetAll);
router.get("/users/getone/:id", verifyToken, isAdmin, controller.GetOne);
router.post("/users/save", verifyToken, isAdmin, validations, controller.Save);
router.delete("/users/delete/:id", verifyToken, isAdmin, controller.Delete);
router.put(
  "/users/update/:id",
  verifyToken,
  isAdmin,
  validations,
  controller.Update
);

module.exports = router;
