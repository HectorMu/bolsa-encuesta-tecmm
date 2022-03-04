const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/graduated.controller");
const validations = require("../middlewares/validations/users.validations");

router.post("/users/graduated/save", verifyToken, validations, controller.Save);
router.get("/users/graduated/getall", verifyToken, controller.GetAll);
router.get("/users/graduated/getone/:id", verifyToken, controller.GetOne);
router.put(
  "/users/graduated/update/:id",
  verifyToken,
  validations,
  controller.Update
);
router.delete("/users/graduated/delete/:id", verifyToken, controller.Delete);

module.exports = router;
