const GraduatedSurveyAnswers = require("../models/GraduatedSurveyAnswers");
const GraduatedSurveyWorking = require("../models/GraduatedSurveyWorking");
const GraduatedSurveyStudy = require("../models/GraduatedSurveyStudy");
const controller = {};

const SECTIONS = {
  PERTINENCIA_DISPONIBILIDAD: 1,
  UBICACION_LABORAL_EGRESADOS: 2,
  DESEMPEÑO_PROFESIONAL_EGRESADOS: 3,
  EXPECTATIVAS_DESARROLLO: 4,
  PARTICIPACION_SOCIAL_EGRESADOS: 5,
  COMENTARIOS_SUGERENCIAS: 6,
};

const ANSWERS_WITH_DETAILS = {
  ACTIVIDAD_ACTUAL: 13,
};

controller.GetAll = async (req, res) => {
  try {
    const data = await GraduatedSurveyAnswers.List();
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
    const data = await GraduatedSurveyAnswers.FindOne(req.params.id);
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
  const newAnswer = {
    fk_usuario: req.user.id,
    fk_seccion: req.params.fk_section,
    fk_pregunta: req.body.fk_pregunta,
    respuesta: req.body.respuesta,
  };

  const {
    tiempo_primer_empleo,
    medio_obtener_empleo,
    requisitos_contratacion,
    idioma_utilizado,
    idioma_hablar,
    idioma_escribir,
    idioma_leer,
    idioma_escuchar,
    antiguedad_empleo,
    año_ingreso,
    salario,
    nivel_jerarquico,
    condicion_trabajo,
    relacion_trabajo_formacion,
    organismo_empresa,
    actividad_principal_empresa,
    razon_social,
    calle,
    numero,
    colonia,
    cp,
    ciudad,
    municipio,
    estado,
    telefono_empresa,
    telefono_ext_empresa,
    fax_empresa,
    email_empresa,
    tipo_sector_empresa,
    sector_empresa,
    tamaño_empresa,
  } = req.body;

  try {
    //revisamos si el usuario ya ha contestado esta pregunta
    const alreadyAnswered = await GraduatedSurveyAnswers.FindOne(
      req.body.fk_pregunta,
      req.user.id
    );

    //Si ya la contesto, cuenta como actualizacion, asi que actualizamos la respuesta
    if (alreadyAnswered) {
      const results = await GraduatedSurveyAnswers.Update(
        newAnswer,
        req.body.fk_pregunta,
        req.user.id
      );

      if (newAnswer.respuesta === "No estudia ni trabaja") {
        await GraduatedSurveyStudy.Delete(req.user.id);
        await GraduatedSurveyWorking.Delete(req.user.id);

        return res.json({
          status: true,
          statusText: "Elemento guardado correctamente.",
        });
      }
      if (newAnswer.respuesta === "Estudia") {
        await GraduatedSurveyWorking.Delete(req.user.id);
      }
      if (newAnswer.respuesta === "Trabaja") {
        await GraduatedSurveyStudy.Delete(req.user.id);
      }
      if (
        parseInt(req.params.fk_section) ===
          SECTIONS.UBICACION_LABORAL_EGRESADOS &&
        parseInt(req.body.fk_pregunta) === ANSWERS_WITH_DETAILS.ACTIVIDAD_ACTUAL
      ) {
        if (req.body.tipo_estudio) {
          const hasStudyDetail = await GraduatedSurveyStudy.FindOne(
            req.user.id
          );
          const { tipo_estudio, especialidad_institucion } = req.body;
          if (hasStudyDetail) {
            await GraduatedSurveyStudy.Update(
              {
                fk_usuario: req.user.id,
                fk_pregunta: req.body.fk_pregunta,
                tipo_estudio,
                especialidad_institucion,
              },
              req.user.id
            );
          } else {
            await GraduatedSurveyStudy.Create({
              fk_usuario: req.user.id,
              fk_pregunta: req.body.fk_pregunta,
              tipo_estudio,
              especialidad_institucion,
            });
          }
        }
        const hasWorkingDetails = await GraduatedSurveyWorking.FindOne(
          req.user.id
        );
        console.log(hasWorkingDetails);

        if (req.body.tiempo_primer_empleo) {
          if (hasWorkingDetails) {
            await GraduatedSurveyWorking.Update(
              {
                fk_usuario: req.user.id,
                fk_pregunta: req.body.fk_pregunta,
                tiempo_primer_empleo,
                medio_obtener_empleo,
                requisitos_contratacion,
                idioma_utilizado,
                idioma_hablar,
                idioma_escribir,
                idioma_leer,
                idioma_escuchar,
                antiguedad_empleo,
                año_ingreso,
                salario,
                nivel_jerarquico,
                condicion_trabajo,
                relacion_trabajo_formacion,
                organismo_empresa,
                actividad_principal_empresa,
                razon_social,
                calle,
                numero,
                colonia,
                cp,
                ciudad,
                municipio,
                estado,
                telefono_empresa,
                telefono_ext_empresa,
                fax_empresa,
                email_empresa,
                tipo_sector_empresa,
                sector_empresa,
                tamaño_empresa,
              },
              req.user.id
            );
          } else {
            await GraduatedSurveyWorking.Create({
              fk_usuario: req.user.id,
              fk_pregunta: req.body.fk_pregunta,
              tiempo_primer_empleo,
              medio_obtener_empleo,
              requisitos_contratacion,
              idioma_utilizado,
              idioma_hablar,
              idioma_escribir,
              idioma_leer,
              idioma_escuchar,
              antiguedad_empleo,
              año_ingreso,
              salario,
              nivel_jerarquico,
              condicion_trabajo,
              relacion_trabajo_formacion,
              organismo_empresa,
              actividad_principal_empresa,
              razon_social,
              calle,
              numero,
              colonia,
              cp,
              ciudad,
              municipio,
              estado,
              telefono_empresa,
              telefono_ext_empresa,
              fax_empresa,
              email_empresa,
              tipo_sector_empresa,
              sector_empresa,
              tamaño_empresa,
            });
          }
        }
      }
      console.log(results);
      res.json({
        status: true,
        statusText: "Pregunta editada correctamente.",
        dbresponse: results,
      });
      //si no la ha contestado, entonces insertamos la respuesta
    } else {
      const results = await GraduatedSurveyAnswers.Create(newAnswer);

      if (newAnswer.respuesta === "No estudia ni trabaja") {
        console.log(results);
        return res.json({
          status: true,
          statusText: "Elemento guardado correctamente.",
        });
      }
      if (
        parseInt(req.params.fk_section) ===
          SECTIONS.UBICACION_LABORAL_EGRESADOS &&
        parseInt(req.body.fk_pregunta) === ANSWERS_WITH_DETAILS.ACTIVIDAD_ACTUAL
      ) {
        if (req.body.tipo_estudio) {
          const { tipo_estudio, especialidad_institucion } = req.body;
          await GraduatedSurveyStudy.Create({
            fk_usuario: req.user.id,
            fk_pregunta: req.body.fk_pregunta,
            tipo_estudio,
            especialidad_institucion,
          });
        }
        if (req.body.tiempo_primer_empleo) {
          await GraduatedSurveyWorking.Create({
            fk_usuario: req.user.id,
            fk_pregunta: req.body.fk_pregunta,
            tiempo_primer_empleo,
            medio_obtener_empleo,
            requisitos_contratacion,
            idioma_utilizado,
            idioma_hablar,
            idioma_escribir,
            idioma_leer,
            idioma_escuchar,
            antiguedad_empleo,
            año_ingreso,
            salario,
            nivel_jerarquico,
            condicion_trabajo,
            relacion_trabajo_formacion,
            organismo_empresa,
            actividad_principal_empresa,
            razon_social,
            calle,
            numero,
            colonia,
            cp,
            ciudad,
            municipio,
            estado,
            telefono_empresa,
            telefono_ext_empresa,
            fax_empresa,
            email_empresa,
            tipo_sector_empresa,
            sector_empresa,
            tamaño_empresa,
          });
        }
      }
      console.log(results);
      return res.json({
        status: true,
        statusText: "Elemento guardado correctamente.",
        dbresponse: results,
      });
    }
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
    const results = await GraduatedSurveyAnswers.Update(
      req.body,
      req.params.id
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
    const results = await GraduatedSurveyAnswers.Delete(req.params.id);
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

module.exports = controller;
