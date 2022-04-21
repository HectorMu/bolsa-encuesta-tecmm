const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const isCompany = require("../middlewares/isCompany");

const companySurveyController = require("../controllers/company.survey.controller");
const surveyValidations = require("../middlewares/validations/surveyCompany.validations");

router.get(
  "/company/survey/seccionb/getp6answers",
  verifyToken,
  isCompany,
  companySurveyController.getAllAnswersP6ByUser
);

router.get(
  "/company/survey/sections",
  verifyToken,
  isCompany,
  companySurveyController.getAllSections
);
router.get(
  "/company/survey/sections/getone/:id",
  verifyToken,
  isCompany,
  companySurveyController.getOneSection
);

router.get(
  "/company/survey/questions/section/:id?",
  verifyToken,
  isCompany,
  companySurveyController.getAllQuestionsOrBySection
);

router.get(
  "/company/survey/section/:id/answers",
  verifyToken,
  isCompany,
  companySurveyController.getAllUserAnswersBySection
);

router.delete(
  "/company/survey/sectionb/p6details/delete/:id",
  verifyToken,
  isCompany,
  companySurveyController.deleteDetailsP6ByUser
);

router.post(
  "/company/survey/sectionb",
  verifyToken,
  isCompany,
  surveyValidations,
  companySurveyController.SaveSectionBAnswers
);

router.post(
  "/company/survey/sectionb/p6details",
  verifyToken,
  isCompany,
  companySurveyController.SaveSectionBP6Answers
);

router.post(
  "/company/survey/sectionc",
  verifyToken,
  isCompany,
  surveyValidations,
  companySurveyController.SaveSectionCAnswers
);

module.exports = router;
