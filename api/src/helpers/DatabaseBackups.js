const db = require("../database");
const helpers = require("./helpers");
const DatabaseBackups = {};

DatabaseBackups.changeAllPasswords = async () => {
  console.log("Encrypting passwords");
  const graduates = await db.query("Select * from usuarios where fk_rol = 2");

  for (let i = 0; i < graduates.length; i++) {
    const graduatedId = graduates[i].id;
    const graduatedEmail = graduates[i].correo;

    const newClave = await helpers.encryptPassword(graduatedEmail);

    await db.query("update usuarios set clave = ? where id = ?", [
      newClave,
      graduatedId,
    ]);
  }
  console.log("finished");
};

DatabaseBackups.changeAllBirthDates = async () => {
  console.log("Renaming birthdates");
  const graduates = await db.query("Select * from perfil_egresado");

  for (let i = 0; i < graduates.length; i++) {
    const graduateBirth = graduates[i].fechaNacimiento;
    const graduatedId = graduates[i].fk_usuario;
    const splittedBirth = graduateBirth.split("-");

    const wellFormattedBirth =
      splittedBirth[2] + "-" + splittedBirth[1] + "-" + splittedBirth[0];
    await db.query(
      "update perfil_egresado set fechaNacimiento = ? where fk_usuario = ?",
      [wellFormattedBirth, graduatedId]
    );
  }
  console.log("finished");
};

DatabaseBackups.runAllActions = async () => {
  await DatabaseBackups.changeAllBirthDates();
  await DatabaseBackups.changeAllPasswords();
  await DatabaseBackups.changeAllBirthDates();
};

module.exports = DatabaseBackups;
