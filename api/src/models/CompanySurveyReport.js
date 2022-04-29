const connection = require("../database");

const Template = {
  async ListCompanies() {
    const data = await connection.query(
      `SELECT * FROM usuarios u, perfil_empresa pe, encuesta_empresa_contestada ec WHERE u.id = pe.fk_usuario && ec.fk_empresa = u.id`
    );
    const companies = data.map((c) => {
      delete c.clave,
        delete c.fk_rol,
        delete c.fk_usuario,
        delete c.fk_empresa,
        delete c.creadoEn,
        delete c.actualizadoEn;

      return c;
    });
    return companies;
  },
  async FindAnswersSectionB(fk_usuario) {
    const survey = {
      P1: " ",
      P2: {
        Carrera: " ",
        Mando_superior: " ",
        Mando_intermedio: " ",
        Supervisor: " ",
        Tecnico_auxiliar: " ",
        Otros: " ",
      },
      P3: {
        Completamente: " ",
        Medianamente: " ",
        Ligeramente: " ",
        Ninguna_relacion: " ",
      },
      P4: {
        Area_estudio: " ",
        Titulacion: " ",
        Experiencia_laboral: " ",
        Competencia_laboral: " ",
        Posicionamiento_institucion_egreso: " ",
        Conocimiento_idiomas_extranjeros: " ",
        Recomendaciones: " ",
        Personalidad: " ",
        Capacidad_liderazgo: " ",
        Otros: " ",
      },
      P5: " ",
    };
    const answers = await connection.query(
      `SELECT r.respuesta FROM respuestas_empresa r WHERE r.fk_usuario = ? && r.fk_seccion_empresa = 1`,
      [fk_usuario]
    );
    if (answers.length > 0) {
      survey.P1 = answers[0].respuesta;
      survey.P5 = answers[1].respuesta;
    }

    let p2Details = await connection.query(
      `SELECT * FROM seccionb_p6_detalle WHERE fk_usuario = ?`,
      [fk_usuario]
    );
    p2Details = p2Details.map((p) => {
      delete p.id, delete p.fk_usuario, delete p.fk_pregunta_empresa;

      return p;
    });
    if (p2Details.length > 0) {
      survey.P2 = { ...p2Details };
    }

    const p3Details = await connection.query(
      `SELECT * FROM seccionb_p7_detalle WHERE fk_usuario = ?`,
      [fk_usuario]
    );
    if (p3Details.length > 0) {
      survey.P3.Completamente = p3Details[0].completamente;
      survey.P3.Ligeramente = p3Details[0].ligeramente;
      survey.P3.Medianamente = p3Details[0].medianamente;
      survey.P3.Ninguna_relacion = p3Details[0].ninguna_relacion;
    }

    const p4Details = await connection.query(
      `SELECT * FROM seccionb_p8_detalle WHERE fk_usuario = ?`,
      [fk_usuario]
    );
    if (p4Details.length > 0) {
      survey.P4.Area_estudio = p4Details[0].area_estudio;
      survey.P4.Titulacion = p4Details[0].titulacion;
      survey.P4.Experiencia_laboral = p4Details[0].experiencia_laboral;
      survey.P4.Competencia_laboral = p4Details[0].competencia_laboral;
      survey.P4.Posicionamiento_institucion_egreso =
        p4Details[0].posicionamiento_institucion_egreso;
      survey.P4.Conocimiento_idiomas_extranjeros =
        p4Details[0].conocimiento_idiomas_extranjeros;
      survey.P4.Recomendaciones = p4Details[0].recomendaciones;
      survey.P4.Personalidad = p4Details[0].personalidad;
      survey.P4.Capacidad_liderazgo = p4Details[0].capacidad_liderazgo;
      survey.P4.Otros = p4Details[0].otros_p8;
    }

    var CompanyAnswersSB = JSON.stringify(survey);
    return CompanyAnswersSB;
  },
  async FindAnswersSectionC(fk_usuario) {
    const survey = {
      P1: {
        Habilidad_resolver_conflictos: " ",
        Ortografia_redaccion: " ",
        Mejora_procesos: " ",
        Trabajo_equipo: " ",
        Habilidad_administrar_tiempo: " ",
        Seguridad_personal: " ",
        Facilidad_palabra: " ",
        Gestion_proyectos: " ",
        Puntualidad_asistencia: " ",
        Cumplimiento_normas: " ",
        Integracion_trabajo: " ",
        Creatividad_innovacion: " ",
        Capacidad_negociacion: " ",
        Capacidad_analisis: " ",
        Liderazgo: " ",
        Adaptacion_cambio: " ",
        Otros: " ",
      },
      P2: {
        Excelente: " ",
        Muy_bueno: " ",
        Bueno: " ",
        Regular: " ",
        Malo: " ",
      },
      P3: " ",
      Comentarios_sugerencias: " ",
    };
    const answers = await connection.query(
      `SELECT r.respuesta FROM respuestas_empresa r WHERE r.fk_usuario = ? && r.fk_seccion_empresa = 2`,
      [fk_usuario]
    );
    if (answers.length > 0) {
      survey.P3 = answers[0].respuesta;
      survey.Comentarios_sugerencias = answers[1].respuesta;
    }

    const p2Details = await connection.query(
      `SELECT * FROM seccionc_p10_detalle WHERE fk_usuario = ?`,
      [fk_usuario]
    );
    if (p2Details.length > 0) {
      survey.P1.Habilidad_resolver_conflictos =
        p2Details[0].habilidad_resolver_conflictos;
      survey.P1.Ortografia_redaccion = p2Details[0].ortografia_redaccion;
      survey.P1.Mejora_procesos = p2Details[0].mejora_procesos;
      survey.P1.Trabajo_equipo = p2Details[0].trabajo_equipo;
      survey.P1.Habilidad_administrar_tiempo =
        p2Details[0].habilidad_administrar_tiempo;
      survey.P1.Seguridad_personal = p2Details[0].seguridad_personal;
      survey.P1.Facilidad_palabra = p2Details[0].facilidad_palabra;
      survey.P1.Gestion_proyectos = p2Details[0].gestion_proyectos;
      survey.P1.Puntualidad_asistencia = p2Details[0].puntualidad_asistencia;
      survey.P1.Cumplimiento_normas = p2Details[0].cumplimiento_normas;
      survey.P1.Integracion_trabajo = p2Details[0].integracion_trabajo;
      survey.P1.Creatividad_innovacion = p2Details[0].creatividad_innovacion;
      survey.P1.Capacidad_negociacion = p2Details[0].capacidad_negociacion;
      survey.P1.Capacidad_analisis = p2Details[0].capacidad_analisis;
      survey.P1.Liderazgo = p2Details[0].liderazgo;
      survey.P1.Adaptacion_cambio = p2Details[0].adaptacion_cambio;
      survey.P1.Otros =
        "Cal: " +
        p2Details[0].otros +
        ", Detalle: " +
        p2Details[0].otros_detalle;
    }

    const p3Details = await connection.query(
      `SELECT * FROM seccionc_p11_detalle WHERE fk_usuario = ?`,
      [fk_usuario]
    );
    if (p3Details.length > 0) {
      survey.P2.Excelente = p3Details[0].excelente;
      survey.P2.Muy_bueno = p3Details[0].muy_bueno;
      survey.P2.Bueno = p3Details[0].bueno;
      survey.P2.Regular = p3Details[0].regular;
      survey.P2.Malo = p3Details[0].malo;
    }

    var CompanyAnswersSC = JSON.stringify(survey);
    return CompanyAnswersSC;
  },
};

module.exports = Template;
