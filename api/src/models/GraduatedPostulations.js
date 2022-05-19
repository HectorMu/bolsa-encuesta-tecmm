const connection = require("../database");

const TABLE_NAME = "solicitud_bolsa";
const IDENTIFIER_NAME = "id";

const GraduatedPostulations = {
  async List(userid) {
    const data = await connection.query(
      ` select * from v_getGraduatedJobsAndCompanyDetails where fk_egresado = ${userid}`
    );
    return data;
  },
  async FindOne(job_id, userid) {
    const data = await connection.query(
      `SELECT sb.*, pe.curriculum from ${TABLE_NAME} sb, perfil_egresado pe where sb.fk_vacante = ? && sb.fk_egresado = ? && pe.fk_usuario = sb.fk_egresado;`,
      [job_id, userid]
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
  async Delete(job_id, userid) {
    const results = await connection.query(
      `delete from ${TABLE_NAME} where fk_vacante = ? && fk_egresado = ${userid}`,
      [job_id]
    );
    return results;
  },
  async RegisterVisitToJob(fk_post, user_id) {
    const results = await connection.query(
      "select * from vistas_publicaciones where fk_publicacion = ? && fk_usuario = ?",
      [fk_post, user_id]
    );
    if (results.length > 0) return;

    const newView = {
      fk_publicacion: fk_post,
      fk_usuario: user_id,
    };

    await connection.query("insert into vistas_publicaciones set ?", [newView]);
  },
};

module.exports = GraduatedPostulations;
