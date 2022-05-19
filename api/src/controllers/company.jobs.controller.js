const CompanyJobs = require("../models/CompanyJobs");
const controller = {};

controller.GetAll = async (req, res) => {
  try {
    const data = await CompanyJobs.List(req.user.id);
    res.json(data);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas",
      error,
    });
  }
};
controller.GetOne = async (req, res) => {
  try {
    const data = await CompanyJobs.FindOne(req.params.id, req.user.id);
    res.json(data);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas",
      error,
    });
  }
};

controller.Save = async (req, res) => {
  const newJob = {
    ...req.body,
    fk_empresa: req.user.id,
  };
  try {
    const results = await CompanyJobs.Create(newJob);
    console.log(results);
    res.json({
      status: true,
      statusText: "Vacante publicada, espera por futuras postulaciones",
      dbresponse: results,
    });
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas",
      error,
    });
  }
};

controller.Update = async (req, res) => {
  try {
    const results = await CompanyJobs.Update(
      req.body,
      req.params.id,
      req.user.id
    );
    console.log(results);

    //Si no exite ninguna fila afectada, significa que ese registro no existe.
    if (results.affectedRows === 0) {
      return res.status(400).json({
        status: false,
        statusText: "No existe esa vacante",
      });
    }
    res.status(200).json({
      status: true,
      statusText: "Datos de la vacante editados correctamente",
      dbresponse: results,
    });
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas",
      error,
    });
  }
};

controller.Delete = async (req, res) => {
  try {
    const results = await CompanyJobs.Delete(req.params.id, req.user.id);

    await console.log(results);
    //Si no exite ninguna fila afectada, significa que ese registro no existe.
    if (results.affectedRows === 0) {
      return res.status(400).json({
        status: false,
        statusText: "No existe esa vacante",
      });
    }
    res.json({
      status: true,
      statusText: "Vacante eliminada correctamente",
      dbresponse: results,
    });
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas",
      error,
    });
  }
};

controller.GetPostulations = async (req, res) => {
  try {
    const data = await CompanyJobs.GetJobPostulations(req.params.job_id);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

controller.GetOnePostulation = async (req, res) => {
  try {
    const data = await CompanyJobs.GetOneJobPostulation(
      req.params.postulation_id
    );
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

controller.FlagPostulationAsReviewed = async (req, res) => {
  try {
    const results = await CompanyJobs.FlagPostulationAsReviewed(
      req.params.postulation_id
    );

    await console.log(results);
    //Si no exite ninguna fila afectada, significa que ese registro no existe.
    if (results.affectedRows === 0) {
      return res.status(400).json({
        status: false,
        statusText: "No existe esa postulación",
      });
    }
    res.json({
      status: true,
      statusText: "Postulación revisada",
      dbresponse: results,
    });
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas",
      error,
    });
  }
};

module.exports = controller;
