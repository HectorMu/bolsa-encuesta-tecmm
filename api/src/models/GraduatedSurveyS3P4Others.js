const connection = require("../database");

const TABLE_NAME = "seccion3_p4_otros";
const IDENTIFIER_NAME = "id";

const GraduatedSurveyS3P4Others = {
  async List() {
    const data = await connection.query(`select * from ${TABLE_NAME}`);
    return data;
  },
  async FindOne(body, user_id) {
    const data = await connection.query(
      `select * from ${TABLE_NAME} where aspecto like '%${body.aspecto}%' && fk_usuario = ?`,
      [user_id]
    );

    return data[0];
  },
  async Create(data) {
    const results = await connection.query(`insert into ${TABLE_NAME} set ?`, [
      data,
    ]);
    return results;
  },
  async CreateOrUpdateIfExists(data, user_id) {
    const hasDetails = await this.FindOne(data, user_id);

    if (hasDetails) {
      const results = await this.Update(data, hasDetails.id);
      return results;
    }
    const results = await this.Create(data);
    return results;
  },
  async Update(data, id) {
    const results = await connection.query(
      `update ${TABLE_NAME} set ? where id = ?`,
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

module.exports = GraduatedSurveyS3P4Others;
