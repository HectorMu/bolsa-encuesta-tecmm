const connection = require("../database");

const TABLE_NAME = "perfil_egresado";
const IDENTIFIER_NAME = "fk_usuario";

const Template = {
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
    return data[0];
  },
  async Create(data) {
    //convertimos el json a string para guardarlo en la base de datos
    data.idioma_extranjero = JSON.stringify(data.idioma_extranjero);
    const results = await connection.query(`insert into ${TABLE_NAME} set ?`, [
      data,
    ]);
    return results;
  },
  async Update(data, id) {
    //convertimos el json a string para guardarlo en la base de datos
    data.idiomaExtranjero = JSON.stringify(data.idiomaExtranjero);
    const results = await connection.query(
      `update ${TABLE_NAME} set ? where fk_usuario = ?`,
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
