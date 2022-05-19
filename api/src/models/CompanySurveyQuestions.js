const connection = require("../database");
const { ListQuestionsPerSection } = require("./GraduatedSurveyQuestions");

const TABLE_NAME = "preguntas_empresa";
const IDENTIFIER_NAME = "id";

const CompanySurveyQuestions = {
  async List() {
    const data = await connection.query(`select * from ${TABLE_NAME}`);
    return data;
  },
  async ListQuestionsPerSection(fk_seccion_empresa) {
    const data = await connection.query(
      `select * from ${TABLE_NAME} where fk_seccion_empresa = ?`,
      [fk_seccion_empresa]
    );
    return data;
  },
  async FindOne(id) {
    const data = await connection.query(
      `select * from ${TABLE_NAME} where ${IDENTIFIER_NAME} = ?`,
      [id]
    );
    return data[0];
  },
};

module.exports = CompanySurveyQuestions;
