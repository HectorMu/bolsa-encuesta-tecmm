const connection = require("../database");

const TABLE_NAME = "usuarios";
const TABLE_PK = "id";

const User = {
  InitialState() {},
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
