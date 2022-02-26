const bcrypt = require("bcryptjs");

const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e);
  }
};

helpers.checkDuplicity = async (table, field, value) => {
  try {
    const results = await pool.query(
      `select * from ${table} where ${field} = ?`,
      [value]
    );
    return results.length > 0 ? true : false;
  } catch (error) {
    console.log(error);
  }
};
helpers.checkDuplicityOnUpdate = async (table, field, currentId, newValue) => {
  try {
    const results = await pool.query(
      `select * from ${table} where ${field} = ? && id != ${currentId}`,
      [newValue]
    );
    return results.length > 0 ? true : false;
  } catch (error) {
    console.log(error);
  }
};

module.exports = helpers;
