const connection = require("../database");

const TABLE_NAME = "perfil_empresa";
const IDENTIFIER_NAME = "id";

const CompanyProfile = {
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

module.exports = CompanyProfile;
