const GraduatedSurveyQuestions = require("../models/GraduatedSurveyQuestions");
const controller = {};

controller.GetAll = async (req, res) => {
  console.log(req.params.fk_section);
  try {
    if (!req.params.fk_section) {
      const data = await GraduatedSurveyQuestions.List();
      return res.json(data);
    }

    const data = await GraduatedSurveyQuestions.ListQuestionsPerSection(
      req.params.fk_section
    );
    res.json(data);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.GetOne = async (req, res) => {
  try {
    const data = await GraduatedSurveyQuestions.FindOne(req.params.id);
    res.json(data);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

module.exports = controller;
