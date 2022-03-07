const express = require("express");
const router = express.Router();

//middlewares
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const validations = require("../middlewares/validations/users.validations");
const graduatesValidations = require("../middlewares/validations/graduates.validations");

//controller import
const controller = require("../controllers/graduated.controller");

router.post(
  "/users/graduated/save",
  verifyToken,
  isAdmin,
  validations,
  graduatesValidations,
  controller.Save
);
router.get("/users/graduated/getall", verifyToken, isAdmin, controller.GetAll);
router.get(
  "/users/graduated/getone/:id",
  verifyToken,
  isAdmin,
  controller.GetOne
);
router.put(
  "/users/graduated/update/:id",
  verifyToken,
  validations,
  graduatesValidations,
  isAdmin,
  controller.Update
);
router.delete(
  "/users/graduated/delete/:id",
  verifyToken,
  isAdmin,
  controller.Delete
);

module.exports = router;
