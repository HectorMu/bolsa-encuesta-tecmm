const connection = require("../database");

const TABLE_NAME = "preguntas";
const IDENTIFIER_NAME = "id";

const GraduatedSurveyQuestions = {
  async List() {
    const data = await connection.query(`select * from ${TABLE_NAME}`);
    return data;
  },
  async ListQuestionsPerSection(fk_seccion) {
    const data = await connection.query(
      `select * from ${TABLE_NAME} where fk_seccion = ?`,
      [fk_seccion]
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

module.exports = GraduatedSurveyQuestions;
