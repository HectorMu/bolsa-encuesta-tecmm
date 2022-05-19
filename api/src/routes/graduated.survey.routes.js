const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const isGraduated = require("../middlewares/IsGraduated");
const validations = require("../middlewares/validations/graduated.survey.validations");

const graduatedSurveyController = require("../controllers/graduated.survey.controller");

router.get(
  "/graduated/survey/check-answered",
  verifyToken,
  isGraduated,
  graduatedSurveyController.checkIfSurveyIsAnswered
);

router.get(
  "/graduated/survey/verify-qr-token/:token",
  graduatedSurveyController.verifySurveyAnsweredToken
);
router.get(
  "/graduated/survey/sections",
  verifyToken,
  isGraduated,
  graduatedSurveyController.getAllSections
);
router.get(
  "/graduated/survey/sections/getone/:id",
  verifyToken,
  isGraduated,
  graduatedSurveyController.getOneSection
);

router.get(
  "/graduated/survey/questions/section/:id?",
  verifyToken,
  isGraduated,
  graduatedSurveyController.getAllQuestionsOrBySection
);

router.get(
  "/graduated/survey/section/:id/answers",
  verifyToken,
  isGraduated,
  graduatedSurveyController.getAllUserAnswersBySection
);

router.post(
  "/graduated/survey/section1",
  verifyToken,
  isGraduated,
  validations.emptyProp,
  graduatedSurveyController.SaveSection1Answers
);

router.post(
  "/graduated/survey/section2",
  verifyToken,
  isGraduated,
  validations.section2,
  graduatedSurveyController.saveSection2Answers
);

router.post(
  "/graduated/survey/section3",
  verifyToken,
  isGraduated,
  validations.emptyProp,
  graduatedSurveyController.saveSection3Answers
);

router.get(
  "/graduated/survey/section3/others-aspects/getall",
  verifyToken,
  isGraduated,
  graduatedSurveyController.getSection3Others
);

router.post(
  "/graduated/survey/section3/others-aspects/save",
  verifyToken,
  isGraduated,
  graduatedSurveyController.saveSection3Other
);
router.delete(
  "/graduated/survey/section3/others-aspects/delete/:aspect_id",
  verifyToken,
  isGraduated,
  graduatedSurveyController.deleteSection3Other
);

router.post(
  "/graduated/survey/section4",
  verifyToken,
  isGraduated,
  graduatedSurveyController.saveSection4Answers
);

router.post(
  "/graduated/survey/section5",
  verifyToken,
  isGraduated,

  graduatedSurveyController.saveSection5Answers
);

router.post(
  "/graduated/survey/section6",
  verifyToken,
  isGraduated,
  graduatedSurveyController.saveSection6Answers
);

module.exports = router;
