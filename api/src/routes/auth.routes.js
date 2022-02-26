const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth.controller");

router.post("/login", controller.Login);

//router.post("/signup", controller.Signup);

router.post("/recover-password/", controller.sendRecoverEmail);

router.get(
  "/verify-reset-token/:ResetToken",
  controller.VerifyRecoverEmailToken
);

router.post("/reset-password/:ResetToken", controller.ResetPassword);

module.exports = router;
