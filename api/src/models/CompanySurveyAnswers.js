const connection = require("../database");

const TABLE_NAME = "respuestas_empresa";
const IDENTIFIER_NAME = "id";

const Template = {
  async List() {
    const data = await connection.query(`select * from ${TABLE_NAME}`);
    return data;
  },
  async FindOne(fk_pregunta_empresa, fk_usuario) {
    const data = await connection.query(
      `select * from ${TABLE_NAME} where fk_pregunta_empresa = ? && fk_usuario = ?`,
      [fk_pregunta_empresa, fk_usuario]
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
    const answerExists = await this.FindOne(
      data.fk_pregunta_empresa,
      data.fk_usuario
    );

    if (answerExists) {
      const results = await this.Update(
        data,
        data.fk_pregunta_empresa,
        data.fk_usuario
      );
      return results;
    }
    const results = await this.Create(data);
    return results;
  },
  async Update(data, fk_pregunta_empresa, fk_usuario) {
    const results = await connection.query(
      `update ${TABLE_NAME} set ? where fk_pregunta_empresa = ? && fk_usuario = ?`,
      [data, fk_pregunta_empresa, fk_usuario]
    );
    return results;
  },
  async Delete(id, fk_usuario) {
    const results = await connection.query(
      `delete from ${TABLE_NAME} where ${IDENTIFIER_NAME} = ? && fk_usuario = ?`,
      [id, fk_usuario]
    );
    return results;
  },
  async getUserSurveyStatus(fk_empresa) {
    const data = await connection.query(
      "select * from encuesta_empresa_contestada where fk_empresa = ?",
      [fk_empresa]
    );
    if (!data.length > 0) {
      return {};
    }
    return data[0];
  },
  async SurveyAnswered(fk_empresa, fecha) {
    const results = await connection.query(
      "insert into encuesta_empresa_contestada set ? ",
      [{ fk_empresa, fecha }]
    );
    return results;
  },
};

module.exports = Template;
