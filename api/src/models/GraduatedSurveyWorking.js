const connection = require("../database");

const TABLE_NAME = "seccion2_trabaja";
const IDENTIFIER_NAME = "fk_usuario";

const Template = {
  async List() {
    const data = await connection.query(`select * from ${TABLE_NAME}`);
    return data;
  },
  async FindOne(id) {
    const data = await connection.query(
      `select * from ${TABLE_NAME} where ${IDENTIFIER_NAME} = ?`,
      [id]
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
    const hasStudyDetails = await this.FindOne(data.fk_usuario);
    if (hasStudyDetails) {
      const results = await this.Update(data, data.fk_usuario);
      return results;
    }
    const results = await this.Create(data);
    return results;
  },
  async Update(data, id) {
    const results = await connection.query(
      `update ${TABLE_NAME} set ? where ${IDENTIFIER_NAME} = ?`,
      [data, id]
    );
    return results;
  },
  async Delete(id) {
    const results = await connection.query(
      `delete from ${TABLE_NAME} where ${IDENTIFIER_NAME} = ?`,
      [id]
    );
    return results;
  },
};

module.exports = Template;
