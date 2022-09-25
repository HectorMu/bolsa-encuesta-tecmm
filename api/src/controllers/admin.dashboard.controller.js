const connection = require("../database");
const controller = {};

controller.AccountsCount = async (req, res) => {
  try {
    const data = await connection.query(
      "SELECT COUNT(*) AS total FROM usuarios;"
    );
    const count = data[0].total;

    res.json({ status: true, count });
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.GraduatesCount = async (req, res) => {
  try {
    const data = await connection.query(
      "SELECT COUNT(*) AS total FROM usuarios WHERE fk_rol =2;"
    );
    const count = data[0].total;

    res.json({ status: true, count });
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};
controller.CompaniesCount = async (req, res) => {
  try {
    const data = await connection.query(
      "SELECT COUNT(*) AS total FROM usuarios WHERE fk_rol =3;"
    );
    const count = data[0].total;

    res.json({ status: true, count });
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};
controller.JobsCount = async (req, res) => {
  try {
    const data = await connection.query(
      "SELECT COUNT(*) AS total FROM publicacion_bolsa;"
    );
    const count = data[0].total;

    res.json({ status: true, count });
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.LatestUsers = async (req, res) => {
  try {
    const data = await connection.query(
      `SELECT u.id, u.correo, r.rol FROM usuarios u, roles r  WHERE u.fk_rol = r.id ORDER BY id DESC LIMIT 30`
    );
    res.json(data);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.LatestAnsweredGraduates = async (req, res) => {
  try {
    const data = await connection.query(
      `SELECT u.id, u.correo, egc.fecha, egc.acuse FROM encuesta_egresado_contestada egc, usuarios u WHERE u.id = egc.fk_egresado ORDER BY u.id DESC LIMIT 30;`
    );
    res.json(data);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.LatestAnsweredCompanies = async (req, res) => {
  try {
    const data = await connection.query(
      `SELECT u.id, u.correo, eec.fecha  FROM encuesta_empresa_contestada eec, usuarios u WHERE u.id = eec.fk_empresa ORDER BY u.id DESC LIMIT 30;`
    );
    res.json(data);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.LatestJobs = async (req, res) => {
  try {
    const data = await connection.query(
      `SELECT * FROM publicacion_bolsa ORDER BY folio DESC;`
    );
    res.json(data);
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
