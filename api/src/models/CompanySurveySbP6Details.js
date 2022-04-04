const connection = require("../database");

const TABLE_NAME = "seccionb_p6_detalle";
const IDENTIFIER_NAME = "fk_usuario";

const Template = {
  async List() {
    const data = await connection.query(`select * from ${TABLE_NAME}`);
    return data;
  },
  async FindAnswersUser(fk_usuario) {
    const data = await connection.query(
      `select carrera, mando_superior, mando_intermedio, supervisor, tecnico_auxiliar, otros_p6 from ${TABLE_NAME} where ${IDENTIFIER_NAME} = ?`,
      [fk_usuario]
    );
    return data;
  },
  async FindOne(fk_usuario, carrera) {
    const data = await connection.query(
      `select * from ${TABLE_NAME} where ${IDENTIFIER_NAME} = ? && carrera = ?`,
      [fk_usuario, carrera]
    );
    return data[0];
  },
  async Create(data) {
    const results = await connection.query(`insert into ${TABLE_NAME} set ?`, [
      data,
    ]);
    return results;
  },
  async CreateOrUpdateIfExists(data) {
    const hasDetails = await this.FindOne(data.fk_usuario, data.carrera);
    if (
      data.carrera === "Ing. en Sistemas Computacionales" ||
      data.carrera === "Ing. en Gestión Empresarial" ||
      data.carrera === "Ing. Industrial" ||
      data.carrera === "Ing. Electromecánica" ||
      data.carrera === "Ing. Civil" ||
      data.carrera === "Ing. en Sistemas Automotrices"
    ) {
      if (hasDetails) {
        const results = await this.Update(data, data.fk_usuario, data.carrera);
        return results;
      }
      const results = await this.Create(data);
      return results;
    }
  },
  async Update(data, id, carrera) {
    const results = await connection.query(
      `update ${TABLE_NAME} set ? where ${IDENTIFIER_NAME} = ? && carrera = ?`,
      [data, id, carrera]
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
