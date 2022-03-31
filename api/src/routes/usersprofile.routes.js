const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/usersprofile.controller");
const validations = require("../middlewares/validations/users.validations");
const graduatesValidations = require("../middlewares/validations/graduates.validations");

router.get("/graduated/profile", verifyToken, controller.getGraduatedProfile);
router.post(
  "/graduated/profile/save",
  verifyToken,
  validations,
  graduatesValidations,
  controller.saveOrUpdateGraduatedProfile
);

module.exports = router;
