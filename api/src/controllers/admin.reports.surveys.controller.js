const GraduatedReport = require("../models/GraduatedSurveyReport");
const CompanyReport = require("../models/CompanySurveyReport");
const helpers = require("../helpers/helpers");

const controller = {};

controller.GetAnswersGraduated = async (req, res) => {
  try {
    const graduates = await GraduatedReport.ListGraduates();

    for (let i = 0; i < graduates.length; i++) {
      graduates[i] = {
        ...graduates[i],
        seccion_2: await GraduatedReport.FindAnswersSection2(graduates[i].id),
        seccion_3: await GraduatedReport.FindAnswersSection3(graduates[i].id),
        seccion_4: await GraduatedReport.FindAnswersSection4(graduates[i].id),
        seccion_5: await GraduatedReport.FindAnswersSection5(graduates[i].id),
        seccion_6: await GraduatedReport.FindAnswersSection6(graduates[i].id),
        seccion_7: await GraduatedReport.FindAnswersSection7(graduates[i].id),
      };
    }
    const parsedFieldsToJSon = helpers.convertFieldsToJson(graduates, [
      "idioma_extranjero",
      "seccion_2",
      "seccion_3",
      "seccion_4",
      "seccion_5",
      "seccion_6",
      "seccion_7",
    ]);
    res.json(parsedFieldsToJSon);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas",
      error,
    });
  }
};

controller.GetAnswersCompany = async (req, res) => {
  try {
    const companies = await CompanyReport.ListCompanies();

    for (let i = 0; i < companies.length; i++) {
      companies[i] = {
        ...companies[i],
        seccion_b: await CompanyReport.FindAnswersSectionB(companies[i].id),
        seccion_c: await CompanyReport.FindAnswersSectionC(companies[i].id),
      };
    }
    const parsedFieldsToJSon = helpers.convertFieldsToJson(companies, [
      "seccion_b",
      "seccion_c",
    ]);
    res.json(parsedFieldsToJSon);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas",
      error,
    });
  }
};

module.exports = controller;
