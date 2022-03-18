const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const graduatedSurveyController = require("../controllers/graduated.survey.controller");

router.get(
  "/graduated/survey/sections",
  verifyToken,
  graduatedSurveyController.getAllSections
);
router.get(
  "/graduated/survey/sections/getone/:id",
  verifyToken,
  graduatedSurveyController.getOneSection
);

router.get(
  "/graduated/survey/questions/section/:id?",
  verifyToken,
  graduatedSurveyController.getAllQuestionsOrBySection
);

router.get(
  "/graduated/survey/section/:id/answers",
  verifyToken,
  graduatedSurveyController.getAllUserAnswersBySection
);

router.post(
  "/graduated/survey/section1",
  verifyToken,
  graduatedSurveyController.SaveSection1Answers
);

router.post(
  "/graduated/survey/section2",
  verifyToken,
  graduatedSurveyController.saveSection2Answers
);

router.post(
  "/graduated/survey/section3",
  verifyToken,
  graduatedSurveyController.saveSection3Answers
);

router.post(
  "/graduated/survey/section4",
  verifyToken,
  graduatedSurveyController.saveSection4Answers
);

router.post(
  "/graduated/survey/section5",
  verifyToken,
  graduatedSurveyController.saveSection5Answers
);

router.post(
  "/graduated/survey/section6",
  verifyToken,
  graduatedSurveyController.saveSection6Answers
);

module.exports = router;
