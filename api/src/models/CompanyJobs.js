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
      `SELECT pb.*,(SELECT COUNT(*) FROM solicitud_bolsa WHERE fk_vacante = pb.folio) AS solicitudes,(SELECT COUNT(*) FROM vistas_publicaciones WHERE fk_publicacion = pb.folio) AS visitas  from publicacion_bolsa pb where fk_empresa = ?`,
      [companyid]
    );
    return data;
  },
  async FindOne(id, company_id) {
    const data = await connection.query(
      `SELECT pb.*,(SELECT COUNT(*) FROM solicitud_bolsa WHERE fk_vacante = pb.folio) AS solicitudes,(SELECT COUNT(*) FROM vistas_publicaciones WHERE fk_publicacion = pb.folio) AS visitas  from publicacion_bolsa pb where fk_empresa = ? && folio = ?`,
      [company_id, id]
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
  async Update(data, id, company_id) {
    delete data.solicitudes;
    delete data.visitas;
    const results = await connection.query(
      `update ${TABLE_NAME} set ? where ${IDENTIFIER_NAME} = ? && fk_empresa = ${company_id}`,
      [data, id]
    );
    return results;
  },
  async Delete(job_id, company_id) {
    await connection.query(
      "delete from vistas_publicaciones where fk_publicacion = ?",
      [job_id]
    );
    await connection.query("delete from solicitud_bolsa where fk_vacante = ?", [
      job_id,
    ]);
    const results = await connection.query(
      `delete from ${TABLE_NAME} where ${IDENTIFIER_NAME} = ? && fk_empresa = ${company_id}`,
      [job_id]
    );

    return results;
  },
  async GetJobPostulations(job_id) {
    const results = await connection.query(
      "select * from solicitud_bolsa where fk_vacante = ?",
      [job_id]
    );
    return results;
  },
};

module.exports = Template;
