const connection = require("../database");

const TABLE_NAME = "perfil_empresa";
const IDENTIFIER_NAME = "fk_usuario";

const CompanyProfile = {
  async List() {
    const data = await connection.query(
      `SELECT * FROM usuarios u, perfil_empresa pe WHERE u.id = pe.fk_usuario`
    );
    const companies = data.map((c) => {
      //Removemos la clave y el rol de todos los elementos del arreglo
      delete c.clave,
        delete c.fk_rol,
        delete c.fk_usuario,
        delete c.creadoEn,
        delete c.actualizadoEn;

      return c;
    });
    return companies;
  },
  async FindOne(id) {
    const data = await connection.query(
      `SELECT * FROM usuarios u, perfil_empresa pe WHERE u.id = pe.fk_usuario && ${IDENTIFIER_NAME} =  ?`,
      [id]
    );
    if (!data.length > 0) {
      return {};
    }
    delete data[0].clave,
      delete data[0].fk_rol,
      delete data[0].fk_usuario,
      delete data[0].creadoEn,
      delete data[0].actualizadoEn;
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
