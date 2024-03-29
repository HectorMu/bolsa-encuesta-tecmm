const connection = require("../database");

const TABLE_NAME = "respuestas";
const IDENTIFIER_NAME = "id";

const GraduatedSurveyAnswers = {
  async List() {
    const data = await connection.query(`select * from ${TABLE_NAME}`);
    return data;
  },
  async FindOne(fk_pregunta, fk_user) {
    const data = await connection.query(
      `select * from ${TABLE_NAME} where fk_pregunta = ? && fk_usuario = ?`,
      [fk_pregunta, fk_user]
    );
    return data[0];
  },
  async Create(data) {
    const results = await connection.query(`insert into ${TABLE_NAME} set ?`, [
      data,
    ]);
    return results;
  },

  async CreateOrUpdateIfExists(data) {
    const answerExists = await this.FindOne(data.fk_pregunta, data.fk_usuario);

    if (answerExists) {
      const results = await this.Update(
        data,
        data.fk_pregunta,
        data.fk_usuario
      );
      return results;
    }
    const results = await this.Create(data);
    return results;
  },
  async Update(data, fk_pregunta, fk_user) {
    const results = await connection.query(
      `update ${TABLE_NAME} set ? where fk_pregunta = ? && fk_usuario = ?`,
      [data, fk_pregunta, fk_user]
    );
    return results;
  },
  async Delete(id, fk_user) {
    const results = await connection.query(
      `delete from ${TABLE_NAME} where ${IDENTIFIER_NAME} = ? && fk_usuario = ?`,
      [id, fk_user]
    );
    return results;
  },
  async getUserSurveyStatus(fk_egresado) {
    const data = await connection.query(
      "select * from encuesta_egresado_contestada where fk_egresado = ?",
      [fk_egresado]
    );
    if (!data.length > 0) {
      return {};
    }
    return data[0];
  },
  async SurveyAnswered(fk_egresado, fecha, acuse) {
    const results = await connection.query(
      "insert into encuesta_egresado_contestada set ? ",
      [{ fk_egresado, fecha, acuse }]
    );
    return results;
  },
  async SurveyAnsweredUpdateOrCreate(fk_egresado, fecha, acuse) {
    const hasAnswered = await this.getUserSurveyStatus(fk_egresado);

    console.log(hasAnswered);
    if (hasAnswered.fk_egresado) {
      const results = await connection.query(
        "update  encuesta_egresado_contestada set ?  where fk_egresado = ?",
        [{ fk_egresado, fecha, acuse }, fk_egresado]
      );
      return results;
    }
    const results = await connection.query(
      "insert into encuesta_egresado_contestada set ? ",
      [{ fk_egresado, fecha, acuse }]
    );

    return results;
  },
};

module.exports = GraduatedSurveyAnswers;
