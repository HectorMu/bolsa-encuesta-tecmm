const connection = require("../database");

const TABLE_NAME = "publicacion_bolsa";
const IDENTIFIER_NAME = "folio";

const Template = {
  async ListAllFreeOfCompanyAndActive() {
    const data = await connection.query(
      `SELECT * FROM view_getJobsAndCompanyDetails WHERE STATUS = 'Abierta';`
    );
    return data;
  },
  async ListAllFreeOfCompany() {
    const data = await connection.query(`select * from ${TABLE_NAME}`);
    return data;
  },
  async FindOneFreeOfCompany(job_id) {
    const data = await connection.query(
      `SELECT * FROM view_getJobsAndCompanyDetails WHERE STATUS = 'Abierta' && folio = ?`,
      [job_id]
    );
    if (!data.length > 0) {
      return {};
    }
    return data[0];
  },
  async List(companyid) {
    const data = await connection.query(
      `select * from ${TABLE_NAME} where fk_empresa = ${companyid}`
    );
    return data;
  },
  async FindOne(id, companyid) {
    const data = await connection.query(
      `select * from ${TABLE_NAME} where ${IDENTIFIER_NAME} = ? && fk_empresa = ${companyid}`,
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
  async Update(data, id, companyid) {
    const results = await connection.query(
      `update ${TABLE_NAME} set ? where ${IDENTIFIER_NAME} = ? && fk_empresa = ${companyid}`,
      [data, id]
    );
    return results;
  },
  async Delete(id, companyid) {
    const results = await connection.query(
      `delete from ${TABLE_NAME} where ${IDENTIFIER_NAME} = ? && fk_empresa = ${companyid}`,
      [id]
    );
    return results;
  },
};

module.exports = Template;
