const bcrypt = require("bcryptjs");
const connection = require("../database");
const path = require("path");
const multer = require("multer");
const GraduatedProfile = require("../models/GraduatedProfile");

const helpers = {};

//Simulacion de enum para roles, esto para no tener los conocidos "magic numbers"
helpers.USER_ROLES = {
  Admin: 1,
  Graduated: 2,
  Company: 3,
};

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

helpers.isDuplicated = async (table, field, value) => {
  try {
    const results = await connection.query(
      `select * from ${table} where ${field} = ?`,
      [value]
    );
    return results.length > 0 ? true : false;
  } catch (error) {
    console.log(error);
  }
};
helpers.isDuplicatedOnUpdate = async (table, field, currentId, newValue) => {
  try {
    //Aqui obtenemos la primary key de la tabla para saber el nombre de la columna
    //Ya que las primary key pueden tener nombres diferentes
    const tableKey = await connection.query(
      `SHOW KEYS FROM ${table} WHERE Key_name = 'PRIMARY'`
    );
    const results = await connection.query(
      `select * from ${table} where ${field} = ? && ${tableKey[0].Column_name} != ${currentId}`,
      [newValue]
    );

    return results.length > 0 ? true : false;
  } catch (error) {
    console.log(error);
  }
};

helpers.isEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

helpers.hasEmptyPropierty = (object) => {
  for (var key in object) {
    if (object[key] === "" || object[key] === null || object[key] === undefined)
      return {
        result: true,
        expected: `El parametro ${key} es requerido`,
      };
  }
  return {
    result: false,
  };
};

const isJson = (string) => {
  try {
    JSON.parse(string);
  } catch (error) {
    return false;
  }
  return true;
};

//Este metodo convierte todos los campos que puedan ser parseados a json a json
//sin embargo, recibe un array de los campos que va a parsear, por ejemplo: ["idioma_extranjero","calificaciones", etc.]
//esto haciendolo siempre que sepamos que un campo es json, y automaticamente crea una tabla dentro con los
//sub campos
helpers.convertFieldsToJson = (array, keysArr = null) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < keysArr.length; j++) {
      if (keysArr[j] in array[i]) {
        if (isJson(array[i][keysArr[j]])) {
          array[i][keysArr[j]] = JSON.parse(array[i][keysArr[j]]);
        }
      }
    }
  }
  return array;
};

helpers.multerStorageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/graduated/cvs/");
  },
  filename: async function (req, file, cb) {
    const graduated = await GraduatedProfile.FindOne(req.user.id);

    cb(null, `graduated-${graduated.no_control}_CV.pdf`);
  },
});

helpers.checkFileType = (file, cb) => {
  // Allowed ext
  const filetypes = /pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(new Error("Error: PDFS Only!"));
  }
};

helpers.isNumber = (prop) => {
  if (typeof prop !== "number") {
    if (isNaN(prop)) {
      return false;
    }
  }
  return true;
};

helpers.getAge = (dateString) => {
  let today = new Date();
  let birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
module.exports = helpers;
