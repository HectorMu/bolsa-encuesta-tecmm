const helpers = require("../../helpers/helpers");

const validations = {};

validations.general = (req, res, next) => {
  if (helpers.hasEmptyPropierty(req.body).result) {
    return res.status(400).json({
      status: false,
      statusText: "Asegurese de contestar todas las preguntas",
    });
  }
  next();
};
validations.section1 = (req, res, next) => {
  if (
    parseInt(req.body.completamente) > 100 ||
    parseInt(req.body.medianamente) > 100 ||
    parseInt(req.body.ligeramente) > 100 ||
    parseInt(req.body.ninguna_relacion) > 100 ||
    parseInt(req.body.completamente) < 0 ||
    parseInt(req.body.medianamente) < 0 ||
    parseInt(req.body.ligeramente) < 0 ||
    parseInt(req.body.ninguna_relacion) < 0
  ) {
    return res.status(400).json({
      status: false,
      statusText:
        "El porcentaje de congruencia entre perfil profesional y función que desarrollan los egresados debe de ser entre el 0 y 100%.",
    });
  }

  const congruenciaPorcentajes =
    parseInt(req.body.completamente) +
    parseInt(req.body.medianamente) +
    parseInt(req.body.ligeramente) +
    parseInt(req.body.ninguna_relacion);

  if (congruenciaPorcentajes > 100) {
    return res.status(400).json({
      status: false,
      statusText:
        "La suma de los porcentajes en congruencia entre perfil profesional y función que desarrollan los egresados debe de dar el 100%.",
    });
  }

  if (
    parseInt(req.body.excelente) > 100 ||
    parseInt(req.body.muy_bueno) > 100 ||
    parseInt(req.body.bueno) > 100 ||
    parseInt(req.body.regular) > 100 ||
    parseInt(req.body.malo) > 100 ||
    parseInt(req.body.excelente) < 0 ||
    parseInt(req.body.muy_bueno) < 0 ||
    parseInt(req.body.bueno) < 0 ||
    parseInt(req.body.regular) < 0 ||
    parseInt(req.body.malo) < 0
  ) {
    return res.status(400).json({
      status: false,
      statusText:
        "El porcentaje en base al desempeño laboral respecto a la formación academica de los egresados debe de ser entre el 0 y 100%.",
    });
  }

  const desempeñoPorcentajes =
    parseInt(req.body.excelente) +
    parseInt(req.body.muy_bueno) +
    parseInt(req.body.bueno) +
    parseInt(req.body.regular) +
    parseInt(req.body.malo);

  if (desempeñoPorcentajes > 100) {
    return res.status(400).json({
      status: false,
      statusText:
        "La suma de los porcentajes en base al desempeño laboral respecto a la formación academica de los egresados debe de dar el 100%.",
    });
  }

  next();
};

module.exports = validations;
