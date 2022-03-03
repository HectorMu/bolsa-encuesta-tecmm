const User = require("../models/User");
const Company = require("../models/CompanyProfile");
const Graduated = require("../models/GraduatedProfile");

const controller = {};

controller.SaveCompany = async (req, res) => {
  //Destructuramos los datos basicos para la tabla usuarios, el ...rest equivale a los datos restantes
  const { correo, clave, fk_rol, ...rest } = req.body;

  //creamos un  nuevo objeto con los datos basicos del usuario
  const basicData = {
    correo,
    clave,
    fk_rol,
  };

  try {
    //En esta constante guardaremos los resultados de la insercion del usuario, nos regresa el id insertado
    //por lo que nos sirve para agregar el perfil
    const userCreation = await User.Create(basicData);

    //Creamos un nuevo objeto donde guardaremos los datos del perfil,
    //pasamos el resto de los datos (...rest),  y pasamos el insert id que nos retorno la accion de creacion
    const profileData = {
      fk_usuario: userCreation.insertId,
      ...rest,
    };

    //Si todo fue bien se insertara el perfil en conjunto con la cuenta creada
    const results = await Company.Create(profileData);
    res.status(200).json({
      status: true,
      statusText: "Empresa guardada correctamente.",
      dbresponse: results,
    });
  } catch (error) {
    console.log("Error code: " + code, "\nSqlMessage: " + sqlMessage);
    res.status(400).json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error: { code, sqlMessage },
    });
  }
};

controller.SaveGraduated = async (req, res) => {
  //Destructuramos los datos basicos para la tabla usuarios, el ...rest equivale a los datos restantes
  const { correo, clave, fk_rol, ...rest } = req.body;

  //creamos un  nuevo objeto con los datos basicos del usuario
  const basicData = {
    correo,
    clave,
    fk_rol,
  };

  try {
    //En esta constante guardaremos los resultados de la insercion del usuario, nos regresa el id insertado
    //por lo que nos sirve para agregar el perfil
    const userCreation = await User.Create(basicData);

    //Creamos un nuevo objeto donde guardaremos los datos del perfil,
    //pasamos el resto de los datos (...rest),  y pasamos el insert id que nos retorno la accion de creacion
    const profileData = {
      fk_usuario: userCreation.insertId,
      ...rest,
    };

    //Si todo fue bien se insertara el perfil en conjunto con la cuenta creada
    const results = await Graduated.Create(profileData);
    res.json({
      status: true,
      statusText: "Egresado guardado correctamente.",
      dbresponse: results,
    });
  } catch (error) {
    console.log("Error code: " + code, "\nSqlMessage: " + sqlMessage);
    res.status(400).json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error: { code, sqlMessage },
    });
  }
};

module.exports = controller;
