const connection = require("../database");

const TABLE_NAME = "seccion";
const IDENTIFIER_NAME = "id";

const GraduatedSurveySections = {
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
};

module.exports = GraduatedSurveySections;
