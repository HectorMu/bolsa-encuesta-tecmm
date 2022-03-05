const connection = require("../database");
const helpers = require("../helpers/helpers");

const TABLE_NAME = "usuarios";
const TABLE_PK = "id";

const User = {
  async InitialState() {
    const adminExists = await connection.query(
      "select * from usuarios where fk_rol = 1"
    );

    if (!adminExists.length > 0) {
      const firstAdmin = {
        correo: "admin@gmail.com",
        clave: "12345678",
        fk_rol: 1,
      };

      firstAdmin.clave = await helpers.encryptPassword(firstAdmin.clave);
      try {
        await connection.query("insert into usuarios set  ?", [firstAdmin]);
        console.log("Initial State executed...\nFirst admin created");
      } catch (error) {
        console.log(error);
      }
    }
  },
  async List() {
    const users = await connection.query(`select * from ${TABLE_NAME}`);
    return users;
  },
  async FindOne(id) {
    const user = await connection.query(
      `select * from ${TABLE_NAME} where ${TABLE_PK} = ?`,
      [id]
    );
    return user[0];
  },
  async Create(data) {
    const results = await connection.query(`insert into ${TABLE_NAME} set ?`, [
      data,
    ]);
    return results;
  },
  async Update(data, id) {
    const results = await connection.query(
      `update ${TABLE_NAME} set ? where ${TABLE_PK} = ?`,
      [data, id]
    );
    return results;
  },
  async Delete(id) {
    const results = await connection.query(
      `delete from ${TABLE_NAME} where ${TABLE_PK} = ?`,
      [id]
    );
    return results;
  },
};

module.exports = User;
