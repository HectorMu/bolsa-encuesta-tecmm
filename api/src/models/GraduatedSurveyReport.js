const connection = require("../database");

const Template = {
  async ListGraduates() {
    const data = await connection.query(
      `SELECT * FROM usuarios u, perfil_egresado pe, encuesta_egresado_contestada ec WHERE u.id = pe.fk_usuario && ec.fk_egresado = u.id;`
    );
    const graduated = data.map((g) => {
      delete g.clave,
        delete g.fk_rol,
        delete g.fk_usuario,
        delete g.fk_egresado,
        delete g.acuse,
        delete g.creadoEn,
        delete g.actualizadoEn,
        delete g.curriculum;

      return g;
    });
    return graduated;
  },
  async FindAnswersSection2(fk_user) {
    const survey = {
      P1: " ",
      P2: " ",
      P3: " ",
      P4: " ",
      P5: " ",
      P6: " ",
    };
    const answers = await connection.query(
      `SELECT r.respuesta FROM respuestas r WHERE r.fk_usuario = ? && r.fk_seccion = 1`,
      [fk_user]
    );
    if (answers.length > 0) {
      survey.P1 = answers[0].respuesta;
      survey.P2 = answers[1].respuesta;
      survey.P3 = answers[2].respuesta;
      survey.P4 = answers[3].respuesta;
      survey.P5 = answers[4].respuesta;
      survey.P6 = answers[5].respuesta;
    }
    var GraduatedAnswersS2 = JSON.stringify(survey);
    return GraduatedAnswersS2;
  },
  async FindAnswersSection3(fk_user) {
    const survey = {
      P1: " ",
      Estudia: " ",
      Especialidad_institucion: " ",
      P2: " ",
      P3: " ",
      P4: " ",
      P5: " ",
      P6: {
        Hablar: " ",
        Escribir: " ",
        Leer: " ",
        Escuchar: " ",
      },
      P7: " ",
      P8: " ",
      P9: " ",
      P10: " ",
      P11: " ",
      P12: {
        Organismo: " ",
        Giro_actividad: " ",
        Razon_social: " ",
        Domicilio: {
          Calle: " ",
          Numero: " ",
          Colonia: " ",
          CP: " ",
          Ciudad: " ",
          Estado: " ",
        },
        Telefonos: " ",
        Fax: " ",
        Correo: " ",
        Pagina_web: " ",
        Jefe_inmediato: " ",
        Sector_economico: " ",
        Tamaño_empresa: " ",
      },
    };

    const answers = await connection.query(
      `SELECT r.respuesta FROM respuestas r WHERE r.fk_usuario = ? && r.fk_seccion = 2`,
      [fk_user]
    );
    if (answers.length > 0) {
      survey.P1 = answers[0].respuesta;
    }

    const study = await connection.query(
      `SELECT * FROM seccion2_estudia WHERE fk_usuario = ?`,
      [fk_user]
    );
    if (study.length > 0) {
      survey.Estudia = study[0].tipo_estudio;
      survey.Especialidad_institucion = study[0].especialidad_institucion;
    }

    const works = await connection.query(
      `SELECT * FROM seccion2_trabaja WHERE fk_usuario = ?`,
      [fk_user]
    );
    if (works.length > 0) {
      survey.P2 = works[0].tiempo_primer_empleo;
      survey.P3 = works[0].medio_obtener_empleo;
      survey.P4 = works[0].requisitos_contratacion;
      survey.P5 = works[0].idioma_utilizado;
      survey.P6.Hablar = works[0].idioma_hablar;
      survey.P6.Escribir = works[0].idioma_escribir;
      survey.P6.Leer = works[0].idioma_leer;
      survey.P6.Escuchar = works[0].idioma_escuchar;
      survey.P7 = works[0].antiguedad_empleo + ", " + works[0].año_ingreso;
      survey.P8 = works[0].salario;
      survey.P9 = works[0].nivel_jerarquico;
      survey.P10 = works[0].condicion_trabajo;
      survey.P11 = works[0].relacion_trabajo_formacion;
      survey.P12.Organismo = works[0].organismo_empresa;
      survey.P12.Giro_actividad = works[0].actividad_principal_empresa;
      survey.P12.Razon_social = works[0].razon_social;
      survey.P12.Domicilio.Calle = works[0].call;
      survey.P12.Domicilio.Numero = works[0].numero;
      survey.P12.Domicilio.Colonia = works[0].colonia;
      survey.P12.Domicilio.CP = works[0].cp;
      survey.P12.Domicilio.Ciudad = works[0].ciudad;
      survey.P12.Domicilio.Estado = works[0].estado;
      survey.P12.Telefonos =
        works[0].telefono_empresa + ", Ext. " + works[0].telefono_ext_empresa;
      survey.P12.Fax = works[0].fax_empresa;
      survey.P12.Correo = works[0].email_empresa;
      survey.P12.Pagina_web = works[0].pagina_web;
      survey.P12.Jefe_inmediato = works[0].jefe_inmediato;
      survey.P12.Sector_economico = works[0].sector_empresa;
      survey.P12.Tamaño_empresa = works[0].tamaño_empresa;
    }

    var GraduatedAnswersS3 = JSON.stringify(survey);
    return GraduatedAnswersS3;
  },
  async FindAnswersSection4(fk_user) {
    const survey = {
      P1: " ",
      P2: " ",
      P3: " ",
      P4: {
        R1: " ",
        R2: " ",
        R3: " ",
        R4: " ",
        R5: " ",
        R6: " ",
        R7: " ",
        R8: " ",
        R9: " ",
        R10: " ",
      },
    };

    const answers = await connection.query(
      `SELECT r.respuesta FROM respuestas r WHERE r.fk_usuario = ? && r.fk_seccion = 3`,
      [fk_user]
    );
    if (answers.length > 0) {
      survey.P1 = answers[0].respuesta;
      survey.P2 = answers[1].respuesta;
      survey.P3 = answers[2].respuesta;
    }

    const p4Details = await connection.query(
      `SELECT * FROM seccion3_p4_detalle WHERE fk_usuario = ?`,
      [fk_user]
    );
    if (p4Details.length > 0) {
      survey.P4.R1 = p4Details[0].area_estudio;
      survey.P4.R2 = p4Details[0].titulacion;
      survey.P4.R3 = p4Details[0].experiencia_laboral;
      survey.P4.R4 = p4Details[0].competencia_laboral;
      survey.P4.R5 = p4Details[0].posicionamiento_institucion_egreso;
      survey.P4.R6 = p4Details[0].conocimiento_idiomas_extranjero;
      survey.P4.R7 = p4Details[0].recomendaciones;
      survey.P4.R8 = p4Details[0].personalidad;
      survey.P4.R9 = p4Details[0].capacidad_liderazgo;
      survey.P4.R10 = p4Details[0].otros;
    }

    var GraduatedAnswersS4 = JSON.stringify(survey);
    return GraduatedAnswersS4;
  },
  async FindAnswersSection5(fk_user) {
    const survey = {
      P1: {
        Curso_actualizacion: " ",
        Curso_detalle: " ",
      },
      P2: {
        Posgrado: " ",
        Posgrado_detalle: " ",
      },
    };

    const answers = await connection.query(
      `SELECT r.respuesta FROM respuestas r WHERE r.fk_usuario = ? && r.fk_seccion = 4`,
      [fk_user]
    );
    if (answers.length > 0) {
      survey.P1.Curso_actualizacion = answers[0].respuesta;
      survey.P2.Posgrado = answers[1].respuesta;
    }

    const p1Details = await connection.query(
      `SELECT * FROM seccion4_p1_detalle WHERE fk_usuario = ?`,
      [fk_user]
    );
    if (p1Details.length > 0) {
      survey.P1.Curso_detalle = p1Details[0].cursos;
    }

    const p2Details = await connection.query(
      `SELECT * FROM seccion4_p2_detalle WHERE fk_usuario = ?`,
      [fk_user]
    );
    if (p2Details.length > 0) {
      survey.P2.Posgrado_detalle = p2Details[0].posgrado;
    }

    var GraduatedAnswersS5 = JSON.stringify(survey);
    return GraduatedAnswersS5;
  },
  async FindAnswersSection6(fk_user) {
    const survey = {
      P1: {
        Organizaciones_sociales: " ",
        Organizaciones_sociales_detalle: " ",
      },
      P2: {
        Organismos_profesionistas: " ",
        Organismos_profesionistas_detalle: " ",
      },
      P3: " ",
    };

    const answers = await connection.query(
      `SELECT r.respuesta FROM respuestas r WHERE r.fk_usuario = ? && r.fk_seccion = 5`,
      [fk_user]
    );
    if (answers.length > 0) {
      survey.P1.Organizaciones_sociales = answers[0].respuesta;
      survey.P2.Organismos_profesionistas = answers[1].respuesta;
      survey.P3 = answers[2].respuesta;
    }

    const p1Details = await connection.query(
      `SELECT * FROM seccion5_p1_detalle WHERE fk_usuario = ?`,
      [fk_user]
    );
    if (p1Details.length > 0) {
      survey.P1.Organizaciones_sociales_detalle =
        p1Details[0].organizaciones_sociales;
    }

    const p2Details = await connection.query(
      `SELECT * FROM seccion5_p2_detalle WHERE fk_usuario = ?`,
      [fk_user]
    );
    if (p2Details.length > 0) {
      survey.P2.Organismos_profesionistas_detalle =
        p2Details[0].organismos_profesionistas;
    }

    var GraduatedAnswersS6 = JSON.stringify(survey);
    return GraduatedAnswersS6;
  },
  async FindAnswersSection7(fk_user) {
    const answers = await connection.query(
      `SELECT r.respuesta FROM respuestas r WHERE r.fk_usuario = ? && r.fk_seccion = 6`,
      [fk_user]
    );

    const survey = {
      comentarios_sugerencias: answers.length > 0 ? answers[0].respuesta : " ",
    };

    var GraduatedAnswersS7 = JSON.stringify(survey);
    return GraduatedAnswersS7;
  },
};

module.exports = Template;
