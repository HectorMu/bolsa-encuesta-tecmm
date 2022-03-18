const connection = require("../database");

const TABLE_NAME = "respuestas";
const IDENTIFIER_NAME = "id";

const Template = {
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
};

module.exports = Template;