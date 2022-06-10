const helpers = require("../../helpers/helpers");

const validations = {};

validations.emptyProp = (req, res, next) => {
  const surveyAnswers = req.body;

  console.log(surveyAnswers);
  if (!surveyAnswers) {
    return res.status(400).json({
      status: false,
      statusText: "El cuerpo de la solicitud esta malformado",
    });
  }

  if (helpers.hasEmptyPropierty(surveyAnswers).result) {
    return res.status(400).json({
      status: false,
      statusText: "Asegurese de contestar todas las preguntas",
    });
  }
  next();
};

validations.section2 = (req, res, next) => {
  const surveyAnswers = req.body;

  if (!surveyAnswers.respuesta1) {
    return res.status(400).json({
      status: false,
      statusText: "Elija  una opción",
    });
  }

  if (
    surveyAnswers.respuesta1 === "Trabaja" ||
    surveyAnswers.respuesta1 === "Estudia y trabaja"
  ) {
    if (helpers.hasEmptyPropierty(surveyAnswers).result) {
      return res.status(400).json({
        status: false,
        statusText: "Asegurese de contestar todas las preguntas",
      });
    }

    const currentYear = new Date().getFullYear();
    const years = currentYear - surveyAnswers.año_ingreso;

    if (surveyAnswers.año_ingreso > currentYear) {
      return res.status(400).json({
        status: false,
        statusText: `¿Conseguiste trabajo en el futuro?`,
      });
    }
    if (surveyAnswers.antiguedad_empleo === "Menos de un año") {
      if (!years < 1) {
        return res.status(400).json({
          status: false,
          statusText: `Tu antiguedad no coincide con tu año de ingreso: ${surveyAnswers.año_ingreso}`,
        });
      }
    }
    if (surveyAnswers.antiguedad_empleo === "Un año") {
      if (years !== 1) {
        return res.status(400).json({
          status: false,
          statusText: `Tu antiguedad no coincide con tu año de ingreso.\nDebiste haber empezado a trabajar en ${
            currentYear - 1
          }`,
        });
      }
    }
    if (surveyAnswers.antiguedad_empleo === "Dos años") {
      if (years !== 2) {
        return res.status(400).json({
          status: false,
          statusText: `Tu antiguedad no coincide con tu año de ingreso.\nDebiste haber empezado a trabajar en ${
            currentYear - 2
          }`,
        });
      }
    }
    if (surveyAnswers.antiguedad_empleo === "Tres años") {
      if (years !== 3) {
        return res.status(400).json({
          status: false,
          statusText: `Tu antiguedad no coincide con tu año de ingreso.\nDebiste haber empezado a trabajar en ${
            currentYear - 3
          }`,
        });
      }
    }
    if (surveyAnswers.antiguedad_empleo === "Mas de tres años") {
      if (years < 4) {
        return res.status(400).json({
          status: false,
          statusText: `Tu antiguedad no coincide con tu año de ingreso.\nDebiste haber empezado a trabajar antes ${
            currentYear - 4
          }`,
        });
      }
    }

    const sum =
      parseInt(surveyAnswers.idioma_leer) +
      parseInt(surveyAnswers.idioma_hablar) +
      parseInt(surveyAnswers.idioma_escuchar) +
      parseInt(surveyAnswers.idioma_escribir);

    if (surveyAnswers.idioma_utilizado !== "Ninguno") {
      if (sum < 100 || sum > 100) {
        return res.status(400).json({
          status: false,
          statusText:
            "La proporción de uso de idioma en el entorno laboral debe sumar 100%",
        });
      }
    }

    if (!helpers.isEmail(surveyAnswers.email_empresa)) {
      return res.status(400).json({
        status: false,
        statusText: "El email de la empresa no es válido",
      });
    }
  }
  if (surveyAnswers.respuesta1 === "Estudia") {
    delete surveyAnswers.requisitos_contratacion;
    if (helpers.hasEmptyPropierty(surveyAnswers).result) {
      return res.status(400).json({
        status: false,
        statusText: "Asegurese de contestar todas las preguntas",
      });
    }
  }

  next();
};

module.exports = validations;
