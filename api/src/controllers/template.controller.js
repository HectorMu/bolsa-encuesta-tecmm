const Template = require("../models/Template");
const controller = {};

controller.GetAll = async (req, res) => {
  try {
    const data = await Template.List();
    res.json(data);
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
    const data = await Template.FindOne(req.params.id);
    res.json(data);
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
  try {
    const results = await Template.Create(req.body);
    console.log(results);
    res.json({
      status: true,
      statusText: "Elemento guardado correctamente.",
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
  try {
    const results = await Template.Update(req.body, req.params.id);
    console.log(results);
    if (results.affectedRows === 0) {
      return res.status(400).json({
        status: false,
        statusText: "No existe ese elemento.",
      });
    }
    res.status(200).json({
      status: true,
      statusText: "Elemento editado correctamente.",
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
    const results = await Template.Delete(req.params.id);
    console.log(results);
    if (results.affectedRows === 0) {
      return res.status(400).json({
        status: false,
        statusText: "No existe ese elemento.",
      });
    }
    res.json({
      status: true,
      statusText: "Elemento eliminado correctamente.",
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
