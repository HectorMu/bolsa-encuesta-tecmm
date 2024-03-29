const connection = require("../database");

const TABLE_NAME = "perfil_egresado";
const IDENTIFIER_NAME = "fk_usuario";

const GraduatedProfile = {
  async List() {
    const data = await connection.query(
      `SELECT * FROM usuarios u, perfil_egresado pe WHERE u.id = pe.fk_usuario;`
    );
    const graduated = data.map((g) => {
      //Removemos estas propiedades de todos los elementos del arreglo
      delete g.clave,
        delete g.fk_rol,
        delete g.fk_usuario,
        delete g.creadoEn,
        delete g.actualizadoEn;

      return g;
    });
    return graduated;
  },
  async FindOne(id) {
    const data = await connection.query(
      `SELECT * FROM usuarios u, perfil_egresado pe WHERE u.id = pe.fk_usuario && u.id = ?`,
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
    data[0].idioma_extranjero = JSON.parse(data[0].idioma_extranjero);
    return data[0];
  },
  async Create(data) {
    //convertimos el json a string para guardarlo en la base de datos
    data.idioma_extranjero = JSON.stringify(data.idioma_extranjero);
    delete data.id;
    const results = await connection.query(`insert into ${TABLE_NAME} set ?`, [
      data,
    ]);
    return results;
  },

  async Update(data, id) {
    //convertimos el json a string para guardarlo en la base de datos
    data.idioma_extranjero = JSON.stringify(data.idioma_extranjero);
    //borramos el id antes de editar, ya que solo nos interesa editar los demas datos
    //ademas que el id es la fk de la cuenta del usuario
    delete data.id;
    delete data.curriculum;

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

  async UpdateCurriculum(fileName, id) {
    const results = await connection.query(
      `update ${TABLE_NAME} set curriculum = ? where ${IDENTIFIER_NAME} = ?`,
      [fileName, id]
    );

    return results;
  },
};

module.exports = GraduatedProfile;
