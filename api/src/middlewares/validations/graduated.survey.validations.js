const helpers = require("../../helpers/helpers");

const validations = (req, res, next) => {
  const surveyAnswers = req.body;

  if (helpers.hasEmptyPropierty(surveyAnswers).result) {
    return res.status(400).json({
      status: false,
      statusText: "Asegurese de contestar todas las preguntas",
    });
  }
  next();
};

module.exports = validations;
