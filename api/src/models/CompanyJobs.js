const connection = require("../database");

const TABLE_NAME = "publicacion_bolsa";
const IDENTIFIER_NAME = "folio";

const CompanyJobs = {
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
  async ListAllForAdmin() {
    const data = await connection.query(
      `SELECT pb.folio, pb.vacante, pe.nombre_comercial,  pb.descripcion, pb.ubicacion,pb.fecha_creacion, pb.fecha_expira, pb.status,  (SELECT COUNT(*) FROM solicitud_bolsa WHERE fk_vacante = pb.folio) AS solicitudes,(SELECT COUNT(*) FROM vistas_publicaciones WHERE fk_publicacion = pb.folio) AS visitas  from publicacion_bolsa pb, perfil_empresa pe WHERE pb.fk_empresa =  pe.fk_usuario;`
    );
    return data;
  },
  async FindOneForAdmin(id) {
    const data = await connection.query(
      `SELECT pe.nombre_comercial, pb.*,  (SELECT COUNT(*) FROM solicitud_bolsa WHERE fk_vacante = pb.folio) AS solicitudes,(SELECT COUNT(*) FROM vistas_publicaciones WHERE fk_publicacion = pb.folio) AS visitas  from publicacion_bolsa pb, perfil_empresa pe WHERE pb.fk_empresa = pe.fk_usuario && pb.folio = ?`,
      [id]
    );
    if (!data.length > 0) {
      return {};
    }
    return data[0];
  },
  async List(companyid) {
    const data = await connection.query(
      `SELECT pb.folio, pb.vacante, pe.nombre_comercial,  pb.descripcion, pb.ubicacion,pb.fecha_creacion, pb.fecha_expira, pb.status,  (SELECT COUNT(*) FROM solicitud_bolsa WHERE fk_vacante = pb.folio) AS solicitudes,(SELECT COUNT(*) FROM vistas_publicaciones WHERE fk_publicacion = pb.folio) AS visitas  from publicacion_bolsa pb, perfil_empresa pe WHERE pb.fk_empresa =  pe.fk_usuario && pb.fk_empresa = ?`,
      [companyid]
    );
    return data;
  },
  async FindOne(id, company_id) {
    const data = await connection.query(
      `SELECT pb.folio, pb.vacante, pe.nombre_comercial,  pb.descripcion, pb.ubicacion,pb.fecha_creacion, pb.fecha_expira, pb.status,  (SELECT COUNT(*) FROM solicitud_bolsa WHERE fk_vacante = pb.folio) AS solicitudes,(SELECT COUNT(*) FROM vistas_publicaciones WHERE fk_publicacion = pb.folio) AS visitas  from publicacion_bolsa pb, perfil_empresa pe WHERE pb.fk_empresa =  pe.fk_usuario && pb.fk_empresa = ? && pb.folio = ?`,
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
  async DeleteAllCompanyPostulations(fk_empresa) {
    const publications = await connection.query(
      "select * from publicacion_bolsa where fk_empresa = ?",
      [fk_empresa]
    );
    console.log(publications);
    for (let i = 0; i < publications.length; i++) {
      await connection.query(
        "delete  from vistas_publicaciones where fk_publicacion = ?",
        [publications[i].folio]
      );
      await connection.query(
        "delete  from solicitud_bolsa where fk_vacante = ?",
        [publications[i].folio]
      );
    }
    await connection.query(
      "delete  from publicacion_bolsa where fk_empresa = ?",
      [fk_empresa]
    );
  },
  async GetJobPostulations(job_id) {
    const results = await connection.query(
      "SELECT * FROM  v_getPostulationsAndProfileDetails where fk_vacante = ?",
      [job_id]
    );
    return results;
  },
  async GetOneJobPostulation(postulation_id) {
    const data = await connection.query(
      "SELECT * FROM  v_getPostulationsAndProfileDetails where id = ?",
      [postulation_id]
    );
    if (!data.length > 0) {
      return {};
    }
    return data[0];
  },
  async FlagPostulationAsReviewed(postulation_id) {
    const results = await connection.query(
      `update solicitud_bolsa set status = 'Revisado' where id = ?`,
      [postulation_id]
    );
    return results;
  },
  async FlagPostulationAsNotReviewed(postulation_id) {
    const results = await connection.query(
      `update solicitud_bolsa set status = 'Sin revisar' where id = ?`,
      [postulation_id]
    );
    return results;
  },
};

module.exports = CompanyJobs;
