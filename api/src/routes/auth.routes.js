const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth.controller");
const validations = require("../middlewares/validations/auth.validations.js");

router.post("/login", validations, controller.Login);

router.post("/recover-password/", validations, controller.sendRecoverEmail);

router.get(
  "/verify-reset-token/:ResetToken",
  controller.VerifyRecoverEmailToken
);

router.post("/reset-password/:ResetToken", controller.ResetPassword);

module.exports = router;
