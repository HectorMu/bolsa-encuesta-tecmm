const GraduatedPostulations = require("../models/GraduatedPostulations");
const GraduatedProfile = require("../models/GraduatedProfile");
const CompanyJobs = require("../models/CompanyJobs");
const controller = {};

controller.GetAll = async (req, res) => {
  try {
    const data = await GraduatedPostulations.List(req.user.id);
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

controller.GetOne = async (req, res) => {
  try {
    const data = await GraduatedPostulations.FindOne(
      req.params.job_id,
      req.user.id
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

controller.Save = async (req, res) => {
  const { job_id } = req.params;
  const newPostulation = {
    ...req.body,
    status: "Sin revisar",
    fk_egresado: req.user.id,
    fk_vacante: job_id,
  };

  try {
    const openVacants = await CompanyJobs.ListAllFreeOfCompanyAndActive();

    const isVacantOpen = openVacants.filter(
      (vacant) =>
        vacant.status === "Abierta" &&
        parseInt(vacant.folio) === parseInt(job_id)
    );

    if (!isVacantOpen.length > 0) {
      return res.json({
        status: false,
        statusText: "Esta vacante ya ha cerrado.",
      });
    }
    const { curriculum: hasCurriculum } = await GraduatedProfile.FindOne(
      req.user.id
    );

    if (hasCurriculum === "Pendiente") {
      return res.json({
        status: false,
        statusText: "No tienes un curriculum... puedes subirlo en tu pérfil.",
      });
    }
    const results = await GraduatedPostulations.Create(newPostulation);
    console.log(results);
    res.json({
      status: true,
      statusText: "Curriculum enviado!",
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
  try {
    const results = await GraduatedPostulations.Update(
      req.body,
      req.params.id,
      req.user.id
    );
    console.log(results);

    //Si no exite ninguna fila afectada, significa que ese registro no existe.
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
  try {
    const results = await GraduatedPostulations.Delete(
      req.params.job_id,
      req.user.id
    );
    console.log(results);
    //Si no exite ninguna fila afectada, significa que ese registro no existe.
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
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.RegisterPostJobVisit = async (req, res) => {
  try {
    await GraduatedPostulations.RegisterVisitToJob(
      req.params.job_id,
      req.user.id
    );
    res.json({
      status: true,
      statusText: "Visita registrada",
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
