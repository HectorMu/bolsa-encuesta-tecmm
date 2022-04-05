const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const companySurveyController = require("../controllers/company.survey.controller");

router.get(
  "/company/survey/seccionb/getp6answers",
  verifyToken,
  companySurveyController.getAllAnswersP6ByUser
);

router.get(
  "/company/survey/sections",
  verifyToken,
  companySurveyController.getAllSections
);
router.get(
  "/company/survey/sections/getone/:id",
  verifyToken,
  companySurveyController.getOneSection
);

router.get(
  "/company/survey/questions/section/:id?",
  verifyToken,
  companySurveyController.getAllQuestionsOrBySection
);

router.get(
  "/company/survey/section/:id/answers",
  verifyToken,
  companySurveyController.getAllUserAnswersBySection
);

router.delete(
  "/company/survey/sectionb/p6details/delete/:id",
  // verifyToken,
  companySurveyController.deleteDetailsP6ByUser
);

router.post(
  "/company/survey/sectionb",
  verifyToken,
  companySurveyController.SaveSectionBAnswers
);

router.post(
  "/company/survey/sectionb/p6details",
  verifyToken,
  companySurveyController.SaveSectionBP6Answers
);

router.post(
  "/company/survey/sectionc",
  verifyToken,
  companySurveyController.SaveSectionCAnswers
);

module.exports = router;
