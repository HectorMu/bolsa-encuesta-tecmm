const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/users.profile.controller");
const uploadCVMiddleware = require("../middlewares/uploadCV");
const validations = require("../middlewares/validations/admin.users.validations");
const companiesValidations = require("../middlewares/validations/admin.company.validations");
const graduatesValidations = require("../middlewares/validations/admin.graduates.validations");

//AAdmin
router.get("/user/profile", verifyToken, controller.getUserProfile);
router.post(
  "/user/profile/save",
  verifyToken,
  validations,
  controller.saveOrUpdateUserProfile
);

//graduated
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

//company
router.get("/company/profile", verifyToken, controller.getCompanyProfile);
router.post(
  "/company/profile/save",
  verifyToken,
  validations,
  companiesValidations,
  controller.saveOrUpdateCompanyProfile
);

module.exports = router;
