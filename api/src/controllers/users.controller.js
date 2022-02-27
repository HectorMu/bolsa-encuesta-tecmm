const User = require("../models/User");
const helpers = require("../helpers/helpers");

const controller = {};

controller.GetAll = async (req, res) => {
  try {
    const users = await User.List();
    res.json(users);
  } catch ({ code, sqlMessage }) {
    console.log("Error code: " + code, "\nSqlMessage: " + sqlMessage);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error: { code, sqlMessage },
    });
  }
};
controller.GetOne = async (req, res) => {
  try {
    const user = await User.FindOne(req.params.id);
    res.json(user);
  } catch ({ code, sqlMessage }) {
    console.log("Error code: " + code, "\nSqlMessage: " + sqlMessage);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error: { code, sqlMessage },
    });
  }
};

controller.Save = async (req, res) => {
  const user = req.body;
  try {
    //Hasheamos la clave para no guardarla en texto plano
    user.clave = await helpers.encryptPassword(user.clave);

    const results = await User.Create(user);
    console.log(results);
    res.json({
      status: true,
      statusText: "Usuario guardado correctamente.",
      dbresponse: results,
    });
  } catch ({ code, sqlMessage }) {
    console.log("Error code: " + code, "\nSqlMessage: " + sqlMessage);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error: { code, sqlMessage },
    });
  }
};

controller.Update = async (req, res) => {
  const user = req.body;
  try {
    if (user.clave) {
      user.clave = await helpers.encryptPassword(user.clave);
    }
    const results = await User.Update(req.body, req.params.id);
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
  } catch ({ code, sqlMessage }) {
    console.log("Error code: " + code, "\nSqlMessage: " + sqlMessage);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error: { code, sqlMessage },
    });
  }
};

controller.Delete = async (req, res) => {
  try {
    const results = await User.Delete(req.params.id);
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
  } catch ({ code, sqlMessage }) {
    console.log("Error code: " + code, "\nSqlMessage: " + sqlMessage);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error: { code, sqlMessage },
    });
  }
};

module.exports = controller;
