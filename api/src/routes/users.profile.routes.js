const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/users.profile.controller");
const uploadCVMiddleware = require("../middlewares/uploadCV");
const validations = require("../middlewares/validations/users.validations");
const companiesValidations = require("../middlewares/validations/company.validations");
const graduatesValidations = require("../middlewares/validations/graduates.validations");

router.get("/user/profile", verifyToken, controller.getUserProfile);
router.post(
  "/user/profile/save",
  verifyToken,
  validations,
  controller.saveOrUpdateUserProfile
);

router.get("/graduated/profile", verifyToken, controller.getGraduatedProfile);
router.post(
  "/graduated/profile/save",
  verifyToken,
  validations,
  graduatesValidations,
  controller.saveOrUpdateGraduatedProfile
);

router.put(
  "/graduated/upload/curriculum",
  verifyToken,
  uploadCVMiddleware,
  controller.uploadGraduatedCV
);
router.get("/graduated/curriculum", verifyToken, controller.getGraduatedCV);

router.get("/company/profile", verifyToken, controller.getCompanyProfile);
router.post(
  "/company/profile/save",
  verifyToken,
  validations,
  companiesValidations,
  controller.saveOrUpdateCompanyProfile
);

module.exports = router;