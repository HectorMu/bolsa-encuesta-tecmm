const User = require("../models/User");
const Company = require("../models/CompanyProfile");

const helpers = require("../helpers/helpers");

const controller = {};

controller.GetAll = async (req, res) => {
  try {
    const companies = await Company.List();
    res.json(companies);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};
controller.GetOne = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.FindOne(id);
    res.json(company);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.Save = async (req, res) => {
  //Destructuramos los datos basicos para la tabla usuarios, el ...rest equivale a los datos restantes
  const { correo, clave, ...rest } = req.body;

  //creamos un  nuevo objeto con los datos basicos del usuario
  const basicData = {
    correo,
    clave,
    fk_rol: 3,
  };

  try {
    //verificamos duplicidad de los campos
    const correoExists = await helpers.isDuplicated(
      "usuarios",
      "correo",
      req.body.correo
    );
    if (correoExists) {
      return res.json({
        status: false,
        statusText: "Este correo electronico ya esta registrado.",
      });
    }

    const nameExists = await helpers.isDuplicated(
      "perfil_empresa",
      "nombre_comercial",
      req.body.nombre_comercial
    );
    if (nameExists) {
      return res.json({
        status: false,
        statusText: "Este nombre comercial ya esta registrado en otra cuenta.",
      });
    }

    //hasheamos la clave para no guardarla en texto plano
    basicData.clave = await helpers.encryptPassword(basicData.clave.toString());
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
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.Update = async (req, res) => {
  const { id } = req.params;
  const { correo, clave, ...rest } = req.body;

  //creamos un  nuevo objeto con los datos basicos del usuario
  const basicData = {
    correo,
    clave,
    fk_rol: 3,
  };
  try {
    //Validamos duplicacion de campos
    const correoExists = await helpers.isDuplicatedOnUpdate(
      "usuarios",
      "correo",
      id,
      basicData.correo
    );

    if (correoExists) {
      return res.json({
        status: false,
        statusText: "Este correo electronico ya esta registrado.",
      });
    }

    const nameExists = await helpers.isDuplicatedOnUpdate(
      "perfil_empresa",
      "nombre_comercial",
      id,
      req.body.nombre_comercial
    );
    if (nameExists) {
      return res.json({
        status: false,
        statusText: "Este nombre comercial ya esta registrado en otra cuenta.",
      });
    }

    //Si recibimos una clave, significa que se quiere editar, entonces la hasheamos
    if (basicData.clave !== null && basicData.clave !== undefined) {
      basicData.clave = await helpers.encryptPassword(
        basicData.clave.toString()
      );
    } else {
      //Si no recibimos una clave, entonces eliminamos la propiedad del objeto
      //Para no mutar la clave actual guardada en la base de datos
      delete basicData.clave;
    }

    //si todo salio bien, guardamos los cambios en el usuario y en su perfilxzasxcvsdfgadfghhgfsafgfg
    await User.Update(basicData, id);
    await Company.Update(rest, id);
    res.json({
      status: true,
      statusText: "Usuario editado correctamente.",
    });
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.Delete = async (req, res) => {
  const { id } = req.params;
  try {
    //Primero eliminamos el perfil
    const deleteProfile = await Company.Delete(id);
    console.log(deleteProfile);
    if (deleteProfile.affectedRows === 0) {
      return res.status(400).json({
        status: false,
        statusText: "No existe ese usuario.",
      });
    }
    //Despues eliminamos la cuenta del usuario
    const deleteUser = await User.Delete(id);
    console.log(deleteUser);
    if (deleteUser.affectedRows === 0) {
      return res.status(400).json({
        status: false,
        statusText: "No existe ese usuario.",
      });
    }
    res.status(200).json({
      status: true,
      statusText: "Usuario eliminado correctamente.",
    });
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};
module.exports = controller;
