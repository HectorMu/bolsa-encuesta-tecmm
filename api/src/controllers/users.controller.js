const User = require("../models/User");
const helpers = require("../helpers/helpers");

const controller = {};

controller.GetAll = async (req, res) => {
  try {
    const users = await User.List();
    res.json(users);
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
  try {
    const user = await User.FindOne(req.params.id);
    res.json(user);
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
  const user = req.body;
  try {
    //Verificiamos que no exista el mismo correo electronico antes de insertar
    const duplicated = await helpers.isDuplicated(
      "usuarios",
      "correo",
      user.correo
    );

    //Si existe, significa que esta dupplicado
    if (duplicated) {
      return res.status(400).json({
        status: false,
        statusText: "Este correo electronico ya esta registrado.",
      });
    }

    //Hasheamos la clave para no guardarla en texto plano
    user.clave = await helpers.encryptPassword(user.clave);

    const results = await User.Create(user);
    console.log(results);
    res.json({
      status: true,
      statusText: "Usuario guardado correctamente.",
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
  const user = req.body;
  const { id } = req.params;
  try {
    //Verificiamos que no exista el mismo correo electronico antes de editar
    const duplicated = await helpers.isDuplicatedOnUpdate(
      "usuarios",
      "correo",
      id,
      user.correo
    );

    //Si existe, significa que esta dupplicado
    if (duplicated) {
      return res.status(400).json({
        status: false,
        statusText: "Este correo electronico ya esta registrado.",
      });
    }
    if (user.clave) {
      user.clave = await helpers.encryptPassword(user.clave);
    }
    const results = await User.Update(user, id);
    if (results.affectedRows === 0) {
      return res.status(400).json({
        status: false,
        statusText: "No existe ese usuario.",
      });
    }
    console.log(results);
    res.json({
      status: true,
      statusText: "Usuario editado correctamente.",
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

controller.Delete = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await User.Delete(id);
    console.log(results);
    if (results.affectedRows === 0) {
      return res.status(400).json({
        status: false,
        statusText: "No existe ese usuario.",
      });
    }
    res.status(200).json({
      status: true,
      statusText: "Usuario eliminado correctamente.",
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

module.exports = controller;
