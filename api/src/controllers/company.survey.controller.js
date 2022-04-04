const CompanySurveySections = require("../models/CompanySurveySections");
const CompanySurveyQuestions = require("../models/CompanySurveyQuestions");
const CompanySurveyAnswers = require("../models/CompanySurveyAnswers");

const SurveySbP6Details = require("../models/CompanySurveySbP6Details");
const SurveySbP7Details = require("../models/CompanySurveySbP7Details");
const SurveySbP8Details = require("../models/CompanySurveySbP8Details");

const SurveyScP10Details = require("../models/CompanySurveyScP10Details");
const SurveyScP11Details = require("../models/CompanySurveyScP11Details");

const controller = {};

controller.getAllSections = async (req, res) => {
  try {
    const data = await CompanySurveySections.List();
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
    const data = await CompanySurveySections.FindOne(req.params.id);
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
      const data = await CompanySurveyQuestions.List();
      return res.json(data);
    }
    const data = await CompanySurveyQuestions.ListQuestionsPerSection(
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
    const data = await CompanySurveyAnswers.List();
    const sectionUserAnswers = data.filter(
      (answer) =>
        answer.fk_seccion_empresa === parseInt(req.params.id) &&
        answer.fk_usuario === parseInt(req.user.id)
    );
    if (parseInt(req.params.id) === 1) {
      const P7Details = await SurveySbP7Details.FindOne(req.user.id);
      const P8Details = await SurveySbP8Details.FindOne(req.user.id);

      const answerWithDetails = {
        respuesta5: sectionUserAnswers[0].respuesta,
        ...P7Details,
        ...P8Details,
        respuesta9: sectionUserAnswers[1].respuesta,
      };
      delete answerWithDetails.fk_usuario;
      delete answerWithDetails.fk_pregunta_empresa;
      return res.json(answerWithDetails);
    }
    if (parseInt(req.params.id) === 2) {
      const P10Details = await SurveyScP10Details.FindOne(req.user.id);
      const P11Details = await SurveyScP11Details.FindOne(req.user.id);

      const answerWithDetails = {
        ...P10Details,
        ...P11Details,
        respuesta12: sectionUserAnswers[0].respuesta,
        respuesta13: sectionUserAnswers[1].respuesta,
      };
      delete answerWithDetails.fk_usuario;
      delete answerWithDetails.fk_pregunta_empresa;
      return res.json(answerWithDetails);
    }
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
    });
  }
};

controller.getAllAnswersP6ByUser = async (req, res) => {
  try {
    const data = await SurveySbP6Details.FindAnswersUser(req.user.id);
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

controller.SaveSectionBP6Answers = async (req, res) => {
  const {
    carrera,
    mando_superior,
    mando_intermedio,
    supervisor,
    tecnico_auxiliar,
    otros_p6,
  } = req.body;
  const QUESTIONS = {
    NUMERO_EGRESADOS_JERARQUIA: 2,
  };

  try {
    await SurveySbP6Details.CreateOrUpdateIfExists({
      fk_usuario: req.user.id,
      fk_pregunta_empresa: QUESTIONS.NUMERO_EGRESADOS_JERARQUIA,
      carrera,
      mando_superior,
      mando_intermedio,
      supervisor,
      tecnico_auxiliar,
      otros_p6,
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

controller.SaveSectionBAnswers = async (req, res) => {
  const { respuesta5, respuesta9 } = req.body;
  const { completamente, medianamente, ligeramente, ninguna_relacion } =
    req.body;
  const {
    area_estudio,
    titulacion,
    experiencia_laboral,
    competencia_laboral,
    posicionamiento_institucion_egreso,
    conocimiento_idiomas_extranjeros,
    recomendaciones,
    personalidad,
    capacidad_liderazgo,
    otros_p8,
  } = req.body;
  const SECTION = 1;
  const QUESTIONS = {
    NUMERO_PROFESIONISTAS: 1,
    CONGRUENCIA_PROFESIONAL: 3,
    REQUISITOS_EMPRESA: 4,
    CARRERAS_DEMANDA: 5,
  };

  try {
    await CompanySurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta_empresa: QUESTIONS.NUMERO_PROFESIONISTAS,
      fk_seccion_empresa: SECTION,
      fk_usuario: req.user.id,
      respuesta: respuesta5,
    });
    await SurveySbP7Details.CreateOrUpdateIfExists({
      fk_usuario: req.user.id,
      fk_pregunta_empresa: QUESTIONS.CONGRUENCIA_PROFESIONAL,
      completamente,
      medianamente,
      ligeramente,
      ninguna_relacion,
    });
    await SurveySbP8Details.CreateOrUpdateIfExists({
      fk_usuario: req.user.id,
      fk_pregunta_empresa: QUESTIONS.REQUISITOS_EMPRESA,
      area_estudio,
      titulacion,
      experiencia_laboral,
      competencia_laboral,
      posicionamiento_institucion_egreso,
      conocimiento_idiomas_extranjeros,
      recomendaciones,
      personalidad,
      capacidad_liderazgo,
      otros_p8,
    });
    await CompanySurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta_empresa: QUESTIONS.CARRERAS_DEMANDA,
      fk_seccion_empresa: SECTION,
      fk_usuario: req.user.id,
      respuesta: respuesta9,
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

controller.SaveSectionCAnswers = async (req, res) => {
  const { respuesta12, respuesta13 } = req.body;
  const {
    habilidad_resolver_conflictos,
    ortografia_redaccion,
    mejora_procesos,
    trabajo_equipo,
    habilidad_administrar_tiempo,
    seguridad_personal,
    facilidad_palabra,
    gestion_proyectos,
    puntualidad_asistencia,
    cumplimiento_normas,
    integracion_trabajo,
    creatividad_innovacion,
    capacidad_negociacion,
    capacidad_analisis,
    liderazgo,
    adaptacion_cambio,
    otros,
  } = req.body;
  const { excelente, muy_bueno, bueno, regular, malo } = req.body;
  const SECTION = 2;
  const QUESTIONS = {
    COMPETENCIAS_EGRESADOS: 6,
    DESEMPEÑO_LABORAL: 7,
    SUGERIR_FORMACION_EGRESADOS: 8,
    COMENTARIOS_SUGERENCIAS: 9,
  };

  try {
    await SurveyScP10Details.CreateOrUpdateIfExists({
      fk_usuario: req.user.id,
      fk_pregunta_empresa: QUESTIONS.COMPETENCIAS_EGRESADOS,
      habilidad_resolver_conflictos,
      ortografia_redaccion,
      mejora_procesos,
      trabajo_equipo,
      habilidad_administrar_tiempo,
      seguridad_personal,
      facilidad_palabra,
      gestion_proyectos,
      puntualidad_asistencia,
      cumplimiento_normas,
      integracion_trabajo,
      creatividad_innovacion,
      capacidad_negociacion,
      capacidad_analisis,
      liderazgo,
      adaptacion_cambio,
      otros,
    });
    await SurveyScP11Details.CreateOrUpdateIfExists({
      fk_usuario: req.user.id,
      fk_pregunta_empresa: QUESTIONS.DESEMPEÑO_LABORAL,
      excelente,
      muy_bueno,
      bueno,
      regular,
      malo,
    });
    await CompanySurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta_empresa: QUESTIONS.SUGERIR_FORMACION_EGRESADOS,
      fk_seccion_empresa: SECTION,
      fk_usuario: req.user.id,
      respuesta: respuesta12,
    });
    await CompanySurveyAnswers.CreateOrUpdateIfExists({
      fk_pregunta_empresa: QUESTIONS.COMENTARIOS_SUGERENCIAS,
      fk_seccion_empresa: SECTION,
      fk_usuario: req.user.id,
      respuesta: respuesta13,
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
