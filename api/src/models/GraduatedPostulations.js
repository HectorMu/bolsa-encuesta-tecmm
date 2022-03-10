const connection = require("../database");

const TABLE_NAME = "solicitud_bolsa";
const IDENTIFIER_NAME = "id";

const Template = {
  async List(userid) {
    const data = await connection.query(
      `select * from ${TABLE_NAME} where fk_egresado = ${userid}`
    );
    return data;
  },
  async FindOne(id, userid) {
    const data = await connection.query(
      `select * from ${TABLE_NAME} where ${IDENTIFIER_NAME} = ? && fk_egresado = ${userid}`,
      [id]
    );
    if (!data.length > 0) {
      return {};
    }
    return data[0];
  },
  async Create(data) {
    const results = await connection.query(`insert into ${TABLE_NAME} set ?`, [
      data,
    ]);
    return results;
  },
  async Update(data, id, userid) {
    const results = await connection.query(
      `update ${TABLE_NAME} set ? where ${IDENTIFIER_NAME} = ? && fk_egresado = ${userid}`,
      [data, id]
    );
    return results;
  },
  async Delete(id, userid) {
    const results = await connection.query(
      `delete from ${TABLE_NAME} where ${IDENTIFIER_NAME} = ? && fk_egresado = ${userid}`,
      [id]
    );
    return results;
  },
};

module.exports = Template;
