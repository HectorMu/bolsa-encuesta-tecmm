const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const sectionsController = require("../controllers/graduated.surveysections.controller");
const questionsController = require("../controllers/graduated.surveyquestions.controller");
const answersController = require("../controllers/graduated.surveyanswers.controller");

router.get(
  "/graduated/survey/sections",
  verifyToken,
  sectionsController.GetAll
);
router.get(
  "/graduated/survey/sections/getone/:id",
  verifyToken,
  sectionsController.GetOne
);

router.get(
  "/graduated/survey/questions/sections/:fk_section?",
  verifyToken,
  questionsController.GetAll
);

router.post(
  "/graduated/survey/answer/:fk_section",
  verifyToken,
  answersController.Save
);

module.exports = router;
