const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const isGraduated = require("../middlewares/isGraduated");
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
  validations,
  graduatedSurveyController.SaveSection1Answers
);

router.post(
  "/graduated/survey/section2",
  verifyToken,
  isGraduated,
  graduatedSurveyController.saveSection2Answers
);

router.post(
  "/graduated/survey/section3",
  verifyToken,
  isGraduated,
  validations,
  graduatedSurveyController.saveSection3Answers
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
