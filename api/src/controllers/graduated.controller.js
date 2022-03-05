const User = require("../models/User");
const Graduated = require("../models/GraduatedProfile");
const helpers = require("../helpers/helpers");

const controller = {};

controller.GetAll = async (req, res) => {
  try {
    const graduated = await Graduated.List();
    res.json(graduated);
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
    const graduated = await Graduated.FindOne(id);
    res.json(graduated);
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
    fk_rol: 2,
  };

  try {
    //Verificamos duplicidad de campos
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
    const nControlExists = await helpers.isDuplicated(
      "perfil_egresado",
      "nControl",
      req.body.nControl
    );
    if (nControlExists) {
      return res.json({
        status: false,
        statusText: "Este numero de control ya esta registrado.",
      });
    }

    const curpExists = await helpers.isDuplicated(
      "perfil_egresado",
      "curp",
      req.body.curp
    );
    if (curpExists) {
      return res.json({
        status: false,
        statusText: "Esta curp ya esta registrada.",
      });
    }
    //Si no hubo ningun error, insertamos el perfil y el usuario
    //En esta constante guardaremos los resultados de la insercion del usuario, nos regresa el id insertado
    //por lo que nos sirve para agregar el perfil

    //Hasheamos la clave para no guardarla en texto plano
    basicData.clave = await helpers.encryptPassword(basicData.clave);

    const userCreation = await User.Create(basicData);

    //Creamos un nuevo objeto donde guardaremos los datos del perfil,
    //pasamos el resto de los datos (...rest),  y pasamos el insert id que nos retorno la accion de creacion
    const profileData = {
      fk_usuario: userCreation.insertId,
      ...rest,
    };
    await Graduated.Create(profileData);
    res.json({
      status: true,
      statusText: "Egresado guardado correctamente.",
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
    fk_rol: 2,
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
    const nControlExists = await helpers.isDuplicatedOnUpdate(
      "perfil_egresado",
      "nControl",
      id,
      req.body.nControl
    );

    if (nControlExists) {
      return res.json({
        status: false,
        statusText: "Este numero de control ya esta registrado.",
      });
    }

    const curpExists = await helpers.isDuplicatedOnUpdate(
      "perfil_egresado",
      "curp",
      id,
      req.body.curp
    );
    if (curpExists) {
      return res.json({
        status: false,
        statusText: "Esta curp ya esta registrada.",
      });
    }

    //Si recibimos una clave, significa que se quiere editar, entonces la hasheamos
    if (basicData.clave !== null && basicData.clave !== undefined) {
      basicData.clave = await helpers.encryptPassword(basicData.clave);
    } else {
      //Si no recibimos una clave, entonces eliminamos la propiedad del objeto
      //Para no mutar la clave actual guardada en la base de datos
      delete basicData.clave;
    }

    //si todo salio bien, guardamos los cambios en el usuario y en su perfilxzasxcvsdfgadfghhgfsafgfg
    await User.Update(basicData, id);
    await Graduated.Update(rest, id);
    res.json({
      status: true,
      statusText: "Egresado editado correctamente.",
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
