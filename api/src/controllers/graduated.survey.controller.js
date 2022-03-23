const GraduatedSurveySections = require("../models/GraduatedSurveySections");
const GraduatedSurveyQuestions = require("../models/GraduatedSurveyQuestions");
const GraduatedSurveyAnswers = require("../models/GraduatedSurveyAnswers");
const SurveyS3P4Details = require("../models/GraduatedSurveyS3P4Details");

const SurveyS4P1Details = require("../models/GraduatedSurveyS4P1Details");
const SurveyS4P2Details = require("../models/GraduatedSurveyS4P2Details");

const SurveyS5P1Details = require("../models/GraduatedSurveyS5P1Details");
const SurveyS5P2Details = require("../models/GraduatedSurveyS5P2Details");

//Section2 table models
const GraduatedSurveyWorking = require("../models/GraduatedSurveyWorking");
const GraduatedSurveyStudy = require("../models/GraduatedSurveyStudy");

const controller = {};

controller.getAllSections = async (req, res) => {
  try {
    const data = await GraduatedSurveySections.List();
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

controller.getOneSection = async (req, res) => {
  try {
    const data = await GraduatedSurveySections.FindOne(req.params.id);
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

controller.getAllQuestionsOrBySection = async (req, res) => {
  try {
    if (!req.params.id) {
      const data = await GraduatedSurveyQuestions.List();
      return res.json(data);
    }
    const data = await GraduatedSurveyQuestions.ListQuestionsPerSection(
      req.params.id
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

controller.getAllUserAnswersBySection = async (req, res) => {
  try {
    const data = await GraduatedSurveyAnswers.List();
    const sectionUserAnswers = data.filter(
      (answer) =>
        answer.fk_seccion === parseInt(req.params.id) &&
        answer.fk_usuario === parseInt(req.user.id)
    );
    res.json(sectionUserAnswers);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.SaveSection1Answers = async (req, res) => {
  const ANSWERS = req.body;
  const SECTION = 1;
  const QUESTIONS = {
    CALIDAD_DOCENTES: 1,
    PLAN_ESTUDIOS: 2,
    PARTICIPAR_PROYECTOS_INVESTIGACION: 3,
    ENFASIS_INVESTIGACION: 4,
    SATISFACCION_CONDICIONES_ESTUDIO: 5,
    EXPERIENCIA_RESIDENCIAS: 6,
  };

  try {
    //Para la primera pregunta de la seccion 1
    await GraduatedSurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta: QUESTIONS.CALIDAD_DOCENTES,
      fk_seccion: SECTION,
      fk_usuario: req.user.id,
      respuesta: ANSWERS.respuesta1,
    });
    //Para la segunda pregunta de la seccion 1
    await GraduatedSurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta: QUESTIONS.PLAN_ESTUDIOS,
      fk_seccion: SECTION,
      fk_usuario: req.user.id,
      respuesta: ANSWERS.respuesta2,
    });
    //Para la tercera pregunta de la seccion 1
    await GraduatedSurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta: QUESTIONS.PARTICIPAR_PROYECTOS_INVESTIGACION,
      fk_seccion: SECTION,
      fk_usuario: req.user.id,
      respuesta: ANSWERS.respuesta3,
    });
    //Para la cuarta pregunta de la seccion 1
    await GraduatedSurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta: QUESTIONS.ENFASIS_INVESTIGACION,
      fk_seccion: SECTION,
      fk_usuario: req.user.id,
      respuesta: ANSWERS.respuesta4,
    });
    //Para la quinta pregunta de la seccion 1
    await GraduatedSurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta: QUESTIONS.SATISFACCION_CONDICIONES_ESTUDIO,
      fk_seccion: SECTION,
      fk_usuario: req.user.id,
      respuesta: ANSWERS.respuesta5,
    });
    //Para la quinta pregunta de la seccion 1
    await GraduatedSurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta: QUESTIONS.EXPERIENCIA_RESIDENCIAS,
      fk_seccion: SECTION,
      fk_usuario: req.user.id,
      respuesta: ANSWERS.respuesta6,
    });
    res.json({
      status: true,
      statusText: "Respuestas guardadas correctamente.",
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

controller.saveSection2Answers = async (req, res) => {
  const ANSWERS = req.body;
  const SECTION = 2;
  const QUESTIONS = { ACTIVIDAD_ACTUAL: 7 };

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
  const { tipo_estudio, especialidad_institucion } = req.body;

  try {
    //Para la primera pregunta de la seccion 2
    //Si no hay una respuesta se crea, y si hay se actualiza
    await GraduatedSurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta: QUESTIONS.ACTIVIDAD_ACTUAL,
      fk_seccion: SECTION,
      fk_usuario: req.user.id,
      respuesta: ANSWERS.respuesta1,
    });

    //si no estudia ni trabaja, borramos sus registros de estudio y trabajo
    if (ANSWERS.respuesta1 === "No estudia ni trabaja") {
      await GraduatedSurveyStudy.Delete(req.user.id);
      await GraduatedSurveyWorking.Delete(req.user.id);
      return res.json({
        status: true,
        statusText: "Respuestas guardadas correctamente.",
      });
    }

    //si solo trabaja, borramos sus estudios de los registros
    //Y guardamos los datos del trabajo
    if (ANSWERS.respuesta1 === "Trabaja") {
      await GraduatedSurveyStudy.Delete(req.user.id);
      await GraduatedSurveyWorking.CreateOrUpdateIfExists({
        fk_usuario: req.user.id,
        fk_pregunta: QUESTIONS.ACTIVIDAD_ACTUAL,
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
      return res.json({
        status: true,
        statusText: "Respuestas guardadas correctamente.",
      });
    }
    //si solo estudia, borramos sus datos de trabajo y guardamos los de estudio
    if (ANSWERS.respuesta1 === "Estudia") {
      await GraduatedSurveyWorking.Delete(req.user.id);
      await GraduatedSurveyStudy.CreateOrUpdateIfExists({
        fk_usuario: req.user.id,
        fk_pregunta: QUESTIONS.ACTIVIDAD_ACTUAL,
        tipo_estudio,
        especialidad_institucion,
      });
      return res.json({
        status: true,
        statusText: "Respuestas guardadas correctamente.",
      });
    }

    //si estudia y trabaja no entrada en ninguna de las opciones anteriores
    //entonces guardamos sus datos de estudio y de trabajo
    await GraduatedSurveyStudy.CreateOrUpdateIfExists({
      fk_usuario: req.user.id,
      fk_pregunta: QUESTIONS.ACTIVIDAD_ACTUAL,
      tipo_estudio,
      especialidad_institucion,
    });
    await GraduatedSurveyWorking.CreateOrUpdateIfExists({
      fk_usuario: req.user.id,
      fk_pregunta: QUESTIONS.ACTIVIDAD_ACTUAL,
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
    res.json({
      status: true,
      statusText: "Respuestas guardadas correctamente.",
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

controller.saveSection3Answers = async (req, res) => {
  const ANSWERS = req.body;
  const SECTION = 3;
  const QUESTIONS = {
    EFICIENCIA_REALIZAR_ACT_LABORALES: 8,
    CALIFICA_FORMACION_ACADEMICA: 9,
    UTILIDAD_RESIDENCIAS: 10,
    ASPECTOS_VALORAR_EMPRESA: 11,
  };

  const {
    area_estudio,
    titulacion,
    experiencia_laboral,
    competencia_laboral,
    posicionamiento_institucion_egreso,
    conocimiento_idiomas_extranjeros,
    recomiendaciones,
    personalidad,
    capacidad_liderazgo,
    otros,
  } = ANSWERS;

  try {
    await GraduatedSurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta: QUESTIONS.EFICIENCIA_REALIZAR_ACT_LABORALES,
      fk_seccion: SECTION,
      fk_usuario: req.user.id,
      respuesta: ANSWERS.respuesta1,
    });
    await GraduatedSurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta: QUESTIONS.CALIFICA_FORMACION_ACADEMICA,
      fk_seccion: SECTION,
      fk_usuario: req.user.id,
      respuesta: ANSWERS.respuesta2,
    });
    await GraduatedSurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta: QUESTIONS.UTILIDAD_RESIDENCIAS,
      fk_seccion: SECTION,
      fk_usuario: req.user.id,
      respuesta: ANSWERS.respuesta3,
    });
    await GraduatedSurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta: QUESTIONS.ASPECTOS_VALORAR_EMPRESA,
      fk_seccion: SECTION,
      fk_usuario: req.user.id,
      respuesta: "N/A. Solo detalle",
    });

    await SurveyS3P4Details.CreateOrUpdateIfExists({
      fk_usuario: req.user.id,
      fk_pregunta: QUESTIONS.ASPECTOS_VALORAR_EMPRESA,
      area_estudio,
      titulacion,
      experiencia_laboral,
      competencia_laboral,
      posicionamiento_institucion_egreso,
      conocimiento_idiomas_extranjeros,
      recomiendaciones,
      personalidad,
      capacidad_liderazgo,
      otros,
    });

    res.json({
      status: true,
      statusText: "Respuestas guardadas correctamente.",
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

controller.saveSection4Answers = async (req, res) => {
  const ANSWERS = req.body;
  const SECTION = 4;
  const QUESTIONS = { TOMAR_CURSOS: 12, TOMAR_POSGRADO: 13 };
  try {
    //Creamos o actualizamos la respuesta: Variara entre Si y No
    await GraduatedSurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta: QUESTIONS.TOMAR_CURSOS,
      fk_seccion: SECTION,
      fk_usuario: req.user.id,
      respuesta: ANSWERS.respuesta1,
    });
    //Si si quiere estudiar un curso adicional creamos o actualizamos el que ya existe
    if (ANSWERS.respuesta1 === "Si") {
      await SurveyS4P1Details.CreateOrUpdateIfExists({
        fk_usuario: req.user.id,
        fk_pregunta: QUESTIONS.TOMAR_CURSOS,
        cursos: ANSWERS.cursos,
      });
    }
    //si no quiere estudiar otro curso adicional, si es que existe un detalle en la tabla lo eliminamos
    if (ANSWERS.respuesta1 === "No") {
      await SurveyS4P1Details.Delete(req.user.id);
    }
    //Creamos o actualizamos la respuesta: Variara entre Si y No
    await GraduatedSurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta: QUESTIONS.TOMAR_POSGRADO,
      fk_seccion: SECTION,
      fk_usuario: req.user.id,
      respuesta: ANSWERS.respuesta2,
    });
    //si quiere estudiar un posgrado creamos o actulizamos el que ya existe
    if (ANSWERS.respuesta2 === "Si") {
      await SurveyS4P2Details.CreateOrUpdateIfExists({
        fk_usuario: req.user.id,
        fk_pregunta: QUESTIONS.TOMAR_CURSOS,
        posgrado: ANSWERS.posgrado,
      });
    }
    //Si no quiere estudiar un posgrado, si existe un registro lo eliminamos de la tabla del detalle
    if (ANSWERS.respuesta2 === "No") {
      await SurveyS4P2Details.Delete(req.user.id);
    }

    res.json({
      status: true,
      statusText: "Respuestas guardadas correctamente.",
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

controller.saveSection5Answers = async (req, res) => {
  const ANSWERS = req.body;
  const SECTION = 5;
  const QUESTIONS = {
    PERTENECE_ORG_SOCIALES: 14,
    PERTENECE_ORG_PROFESIONISTAS: 15,
    PERTENECE_ORG_EGRESADOS: 16,
  };
  try {
    await GraduatedSurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta: QUESTIONS.PERTENECE_ORG_SOCIALES,
      fk_seccion: SECTION,
      fk_usuario: req.user.id,
      respuesta: ANSWERS.respuesta1,
    });

    if (ANSWERS.respuesta1 === "Si") {
      await SurveyS5P1Details.CreateOrUpdateIfExists({
        fk_usuario: req.user.id,
        fk_pregunta: QUESTIONS.PERTENECE_ORG_SOCIALES,
        organizaciones_sociales: req.body.organizaciones_sociales,
      });
    }
    if (ANSWERS.respuesta1 === "No") {
      await SurveyS5P1Details.Delete(req.user.id);
    }

    await GraduatedSurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta: QUESTIONS.PERTENECE_ORG_PROFESIONISTAS,
      fk_seccion: SECTION,
      fk_usuario: req.user.id,
      respuesta: ANSWERS.respuesta2,
    });

    if (ANSWERS.respuesta2 === "Si") {
      await SurveyS5P2Details.CreateOrUpdateIfExists({
        fk_usuario: req.user.id,
        fk_pregunta: QUESTIONS.PERTENECE_ORG_PROFESIONISTAS,
        organismos_profesionistas: req.body.organismos_profesionistas,
      });
    }
    if (ANSWERS.respuesta2 === "No") {
      await SurveyS5P2Details.Delete(req.user.id);
    }

    await GraduatedSurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta: QUESTIONS.PERTENECE_ORG_EGRESADOS,
      fk_seccion: SECTION,
      fk_usuario: req.user.id,
      respuesta: ANSWERS.respuesta3,
    });
    res.json({
      status: true,
      statusText: "Respuestas guardadas correctamente.",
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

controller.saveSection6Answers = async (req, res) => {
  const ANSWERS = req.body;
  const SECTION = 6;
  const QUESTIONS = { OPINION_RECOMENDACION: 17 };
  try {
    await GraduatedSurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta: QUESTIONS.OPINION_RECOMENDACION,
      fk_seccion: SECTION,
      fk_usuario: req.user.id,
      respuesta: ANSWERS.respuesta1,
    });
    res.json({
      status: true,
      statusText: "Respuestas guardadas correctamente.",
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