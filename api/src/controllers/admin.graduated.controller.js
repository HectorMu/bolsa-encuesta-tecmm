const User = require("../models/User");
const Graduated = require("../models/GraduatedProfile");
const GraduatedSurveyAnswers = require("../models/GraduatedSurveyAnswers");
const CompanyJobs = require("../models/CompanyJobs.js");
const GraduatedPostulations = require("../models/GraduatedPostulations");
const helpers = require("../helpers/helpers");
const nodeMailer = require("../lib/nodemailer");

const controller = {};

controller.GetAllActiveJobs = async (req, res) => {
  try {
    const jobs = await CompanyJobs.ListAllFreeOfCompanyAndActive();
    res.json(jobs);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};
controller.GetOneJob = async (req, res) => {
  try {
    const job = await CompanyJobs.FindOneFreeOfCompany(req.params.job_id);
    res.json(job);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.GetAll = async (req, res) => {
  try {
    const graduates = await Graduated.List();
    const parsedFieldsToJSon = helpers.convertFieldsToJson(graduates, [
      "idioma_extranjero",
    ]);
    res.json(parsedFieldsToJSon);
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
  const { id } = req.params;
  try {
    const graduated = await Graduated.FindOne(id);
    res.json(graduated);
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
  console.log(req.body);
  //Destructuramos los datos basicos para la tabla usuarios, el ...rest equivale a los datos restantes
  const { correo, clave, ...rest } = req.body;

  //creamos un  nuevo objeto con los datos basicos del usuario
  const basicData = {
    correo,
    clave,
    fk_rol: 2,
  };

  try {
    //Verificamos duplicidad de campos
    const correoExists = await helpers.isDuplicated(
      "usuarios",
      "correo",
      req.body.correo
    );
    if (correoExists) {
      return res.json({
        status: false,
        statusText: "Este correo electronico ya esta registrado.",
      });
    }
    const nControlExists = await helpers.isDuplicated(
      "perfil_egresado",
      "no_control",
      req.body.no_control
    );
    if (nControlExists) {
      return res.json({
        status: false,
        statusText: "Este numero de control ya esta registrado.",
      });
    }

    const curpExists = await helpers.isDuplicated(
      "perfil_egresado",
      "curp",
      req.body.curp
    );
    if (curpExists) {
      return res.json({
        status: false,
        statusText: "Esta curp ya esta registrada.",
      });
    }
    //Si no hubo ningun error, insertamos el perfil y el usuario
    //En esta constante guardaremos los resultados de la insercion del usuario, nos regresa el id insertado
    //por lo que nos sirve para agregar el perfil

    //Hasheamos la clave para no guardarla en texto plano
    basicData.clave = await helpers.encryptPassword(basicData.clave.toString());

    const userCreation = await User.Create(basicData);

    //Creamos un nuevo objeto donde guardaremos los datos del perfil,
    //pasamos el resto de los datos (...rest),  y pasamos el insert id que nos retorno la accion de creacion
    const profileData = {
      fk_usuario: userCreation.insertId,
      curriculum: "Pendiente",
      ...rest,
    };
    await Graduated.Create(profileData);
    res.json({
      status: true,
      statusText: "Egresado guardado correctamente.",
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
  const { id } = req.params;
  const { correo, clave, ...rest } = req.body;

  //creamos un  nuevo objeto con los datos basicos del usuario
  const basicData = {
    correo,
    clave,
    fk_rol: 2,
  };
  try {
    //Validamos duplicacion de campos
    const correoExists = await helpers.isDuplicatedOnUpdate(
      "usuarios",
      "correo",
      id,
      basicData.correo
    );

    if (correoExists) {
      return res.json({
        status: false,
        statusText: "Este correo electronico ya esta registrado.",
      });
    }
    const nControlExists = await helpers.isDuplicatedOnUpdate(
      "perfil_egresado",
      "no_control",
      id,
      req.body.no_control
    );

    if (nControlExists) {
      return res.json({
        status: false,
        statusText: "Este numero de control ya esta registrado.",
      });
    }

    const curpExists = await helpers.isDuplicatedOnUpdate(
      "perfil_egresado",
      "curp",
      id,
      req.body.curp
    );
    if (curpExists) {
      return res.json({
        status: false,
        statusText: "Esta curp ya esta registrada.",
      });
    }

    //Si recibimos una clave, significa que se quiere editar, entonces la hasheamos
    if (basicData.clave !== null && basicData.clave !== undefined) {
      basicData.clave = await helpers.encryptPassword(
        basicData.clave.toString()
      );
    } else {
      //Si no recibimos una clave, entonces eliminamos la propiedad del objeto
      //Para no mutar la clave actual guardada en la base de datos
      delete basicData.clave;
    }

    //si todo salio bien, guardamos los cambios en el usuario y en su perfilxzasxcvsdfgadfghhgfsafgfg
    await User.Update(basicData, id);
    await Graduated.Update(rest, id);
    res.json({
      status: true,
      statusText: "Egresado editado correctamente.",
    });
  } catch (error) {
    console.log("Error " + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.Delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.Delete(id);
    console.log(deleteUser);
    if (deleteUser.affectedRows === 0) {
      return res.status(400).json({
        status: false,
        statusText: "No existe ese usuario.",
      });
    }
    res.status(200).json({
      status: true,
      statusText: "Usuario eliminado correctamente.",
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

controller.CheckSurveyAnswered = async (req, res) => {
  try {
    const surveyStatus = await GraduatedSurveyAnswers.getUserSurveyStatus(
      req.params.id
    );

    return res.json(surveyStatus);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.NotifyGraduatedAnswerSurvey = async (req, res) => {
  try {
    nodeMailer.NotifyGraduatedAnswerSurvey(req, res);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.NotifyGraduatedCheckCV = async (req, res) => {
  try {
    nodeMailer.NotifyGraduatedCheckCV(req, res);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.GetGraduatedPostulations = async (req, res) => {
  try {
    const data = await GraduatedPostulations.List(req.params.id);
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
