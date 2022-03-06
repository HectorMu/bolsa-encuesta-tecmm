const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/graduated.controller");
const validations = require("../middlewares/validations/users.validations");
const graduatesValidations = require("../middlewares/validations/graduates.validations");

router.post(
  "/users/graduated/save",
  verifyToken,
  validations,
  graduatesValidations,
  controller.Save
);
router.get("/users/graduated/getall", verifyToken, controller.GetAll);
router.get("/users/graduated/getone/:id", verifyToken, controller.GetOne);
router.put(
  "/users/graduated/update/:id",
  verifyToken,
  validations,
  graduatesValidations,
  controller.Update
);
router.delete("/users/graduated/delete/:id", verifyToken, controller.Delete);

module.exports = router;
